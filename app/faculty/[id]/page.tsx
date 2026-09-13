import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFacultyById, getFacultyChildren } from '@/lib/data';

type Params = { id: string };
type Publication = { id:number; title:string|null; authors:string|null; venue:string|null; cited_by:string|null; year:number|null; url:string|null };
type Achievement = { id:number; title:string|null; description:string|null; year:number|null; url:string|null };
type Membership = { id:number; membership:string };
type FacultyLink = { id:number; label:string|null; url:string };

export const dynamic = 'force-dynamic';

export async function generateMetadata({params}:{params:Promise<Params>}): Promise<Metadata> {
  const {id}=await params;
  const faculty=await getFacultyById(decodeURIComponent(id));
  if(!faculty) return {title:'Faculty Not Found | ANITS Faculty Portal'};
  return {title:`${faculty.name} | ANITS Faculty Portal`,description:`View the academic profile, research interests, publications and achievements of ${faculty.name}, ${faculty.department}.`};
}

export default async function FacultyProfile({params}:{params:Promise<Params>}){
 const {id}=await params;
 const f=await getFacultyById(decodeURIComponent(id));
 if(!f) notFound();
 const c=await getFacultyChildren(f.id) as {publications:Publication[];achievements:Achievement[];memberships:Membership[];links:FacultyLink[]};
 const designation=(f.designation||'Faculty').split('|')[0].trim();
 return <main className="container profile">
  <Link href="/faculty" className="text-link">← Back to faculty directory</Link>
  <section className="profile-card profile-hero">
   <img className="profile-photo" src={f.photo||'/placeholder.svg'} alt={f.name}/>
   <div><span className="eyebrow">{f.department}</span><h1>{f.name}</h1><div className="profile-meta"><b>{designation}</b>{f.qualification&&<><br/>{f.qualification}</>}{f.teaching_experience&&<><br/>{f.teaching_experience}</>}{f.email&&<><br/><a className="text-link" href={`mailto:${f.email}`}>{f.email}</a></>}{f.phone&&<><br/>{f.phone}</>}</div>
   {f.research_interests&&<div className="chips">{f.research_interests.split(/[,;]+/).map(x=>x.trim()).filter(Boolean).map(x=><span className="chip" key={x}>{x}</span>)}</div>}
   <div className="hero-actions">{f.profile_url&&<a className="button primary" href={f.profile_url} target="_blank" rel="noreferrer">Official Profile ↗</a>}{f.irins_url&&<a className="button secondary profile-secondary" href={f.irins_url} target="_blank" rel="noreferrer">IRINS ↗</a>}</div></div>
  </section>
  <div className="profile-summary"><span><strong>{c.publications.length}</strong> Publications</span><span><strong>{c.achievements.length}</strong> Achievements</span><span><strong>{c.memberships.length}</strong> Memberships</span></div>
  <div className="detail-grid">
   <section className="detail-card wide-card"><h2>Publications <span className="muted">({c.publications.length})</span></h2>{c.publications.length?<ol className="publication-list">{c.publications.map(p=><li key={p.id}>{p.url?<a className="text-link" href={p.url} target="_blank" rel="noreferrer">{p.title||'Untitled publication'} ↗</a>:p.title||'Untitled publication'}{p.authors&&<><br/><span className="muted">{p.authors}</span></>}{(p.venue||p.year||p.cited_by)&&<><br/><span className="muted">{p.venue||''}{p.year?` · ${p.year}`:''}{p.cited_by?` · Cited by ${p.cited_by}`:''}</span></>}</li>)}</ol>:<p className="muted">No publications listed.</p>}</section>
   <section className="detail-card"><h2>Achievements <span className="muted">({c.achievements.length})</span></h2>{c.achievements.length?<ul>{c.achievements.map(a=><li key={a.id}>{a.url?<a className="text-link" href={a.url} target="_blank" rel="noreferrer">{a.title||'Achievement'} ↗</a>:a.title||'Achievement'}{a.description&&<><br/><span className="muted">{a.description}</span></>}{a.year&&<span className="muted"> · {a.year}</span>}</li>)}</ul>:<p className="muted">No achievements listed.</p>}</section>
   <section className="detail-card"><h2>Memberships</h2>{c.memberships.length?<div className="chips">{c.memberships.map(m=><span className="chip" key={m.id}>{m.membership}</span>)}</div>:<p className="muted">No memberships listed.</p>}</section>
   <section className="detail-card"><h2>Academic Links</h2>{c.links.length?<ul>{c.links.map(l=><li key={l.id}><a className="text-link" href={l.url} target="_blank" rel="noreferrer">{l.label||l.url} ↗</a></li>)}</ul>:<p className="muted">No additional links listed.</p>}</section>
  </div>
 </main>
}
