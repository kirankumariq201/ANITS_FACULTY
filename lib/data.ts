import { supabase } from '@/lib/supabase';

export const DEPARTMENTS = ['CSE', 'ECE', 'EEE', 'CSE-DS', 'CIVIL', 'CHEMICAL', 'MECH', 'IT', 'AIML'];

export type Faculty = {
  id: string; name: string; department: string; designation: string | null;
  email: string | null; phone: string | null; qualification: string | null;
  teaching_experience: string | null; photo: string | null; profile_url: string | null;
  irins_url: string | null; research_interests: string | null;
};

export async function getFaculty(options?: { search?: string; department?: string; designation?: string }) {
  let query = supabase.from('faculty').select('*').order('name');
  if (options?.department && DEPARTMENTS.includes(options.department)) query = query.eq('department', options.department);
  if (options?.designation) query = query.ilike('designation', `%${options.designation}%`);
  if (options?.search) query = query.ilike('name', `%${options.search}%`);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Faculty[];
}

export async function getFacultyById(id: string) {
  const { data, error } = await supabase.from('faculty').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as Faculty | null;
}

export async function getFacultyChildren(id: string) {
  const [publications, achievements, memberships, links] = await Promise.all([
    supabase.from('publications').select('*').eq('faculty_id', id).order('year', { ascending: false, nullsFirst: false }),
    supabase.from('achievements').select('*').eq('faculty_id', id).order('year', { ascending: false, nullsFirst: false }),
    supabase.from('memberships').select('*').eq('faculty_id', id).order('membership'),
    supabase.from('faculty_links').select('*').eq('faculty_id', id).order('label'),
  ]);
  const firstError = [publications, achievements, memberships, links].find((r) => r.error)?.error;
  if (firstError) throw new Error(firstError.message);
  return { publications: publications.data ?? [], achievements: achievements.data ?? [], memberships: memberships.data ?? [], links: links.data ?? [] };
}

export async function getFacultyStats() {
  const { count, error } = await supabase.from('faculty').select('*', { count: 'exact', head: true });
  if (error) throw new Error(error.message);
  return count ?? 0;
}