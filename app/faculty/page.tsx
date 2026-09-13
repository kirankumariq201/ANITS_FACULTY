import Link from 'next/link';
import { getFaculty, DEPARTMENTS, type Faculty } from '@/lib/data';

function FacultyCard({ f }: { f: Faculty }) {
  return <Link href={`/faculty/${encodeURIComponent(f.id)}`} className="faculty-card">
    <div className="avatar">{f.photo ? <img src={f.photo} alt={f.name} loading="lazy" /> : <span>{f.name.charAt(0)}</span>}</div>
    <div className="faculty-info"><span className="dept">{f.department}</span><h3>{f.name}</h3><p>{(f.designation || 'Faculty').replace(/\s*\|\s*None\s*$/i, '')}</p>{f.research_interests && <small>{f.research_interests.slice(0, 110)}{f.research_interests.length > 110 ? '…' : ''}</small>}</div>
  </Link>;
}

export default async function FacultyPage({ searchParams }: { searchParams: Promise<{ q?: string; department?: string; designation?: string }> }) {
  const params = await searchParams;
  const faculty = await getFaculty({ search: params.q, department: params.department, designation: params.designation });
  return <main className="container page-space">
    <div className="page-heading"><span className="eyebrow">DIRECTORY</span><h1>Faculty Directory</h1><p>Browse {faculty.length} faculty profiles and discover their academic work.</p></div>
    <form className="filters" action="/faculty"><input name="q" defaultValue={params.q} placeholder="Search faculty by name…" /><select name="department" defaultValue={params.department || ''}><option value="">All departments</option>{DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}</select><input name="designation" defaultValue={params.designation} placeholder="Designation…" /><button className="button primary" type="submit">Search</button></form>
    {faculty.length ? <div className="faculty-grid">{faculty.map(f => <FacultyCard key={f.id} f={f} />)}</div> : <div className="empty"><h2>No faculty found</h2><p>Try a different name, department or designation.</p><Link href="/faculty" className="button secondary">Clear filters</Link></div>}
  </main>;
}