import Link from 'next/link';
import { Search } from 'lucide-react';
import { getFaculty, DEPARTMENTS } from '@/lib/data';
import FacultyCard from '@/components/FacultyCard';

export const dynamic = 'force-dynamic';

export default async function FacultyPage({searchParams}:{searchParams:Promise<{search?:string;department?:string;designation?:string}>}){
 const p=await searchParams;
 const faculty=await getFaculty({search:p.search,department:p.department,designation:p.designation});
 return <main className="container"><section className="page-head"><span className="eyebrow">ANITS DIRECTORY</span><h1>Faculty Directory</h1><p>Search and explore faculty profiles, research interests, publications and achievements.</p></section>
 <form className="toolbar" method="get"><div className="search-box"><Search size={18}/><input className="input" name="search" defaultValue={p.search||''} placeholder="Search by faculty name..." aria-label="Search faculty by name"/></div><select className="select" name="department" defaultValue={p.department||''} aria-label="Filter by department"><option value="">All departments</option>{DEPARTMENTS.map(d=><option key={d}>{d}</option>)}</select><input className="input designation-input" name="designation" defaultValue={p.designation||''} placeholder="Designation (optional)" aria-label="Filter by designation"/><button className="button primary" type="submit">Search</button>{(p.search||p.department||p.designation)&&<Link href="/faculty" className="button secondary clear-button">Clear</Link>}</form>
 <div className="directory-summary"><p className="muted"><strong>{faculty.length}</strong> profile{faculty.length===1?'':'s'} found</p>{p.department&&<span className="chip">{p.department}</span>}</div>
 {faculty.length?<div className="faculty-grid">{faculty.map(f=><FacultyCard key={f.id} faculty={f}/>)}</div>:<div className="detail-card"><h2>No faculty found</h2><p className="muted">Try a different name, department or designation.</p><Link href="/faculty" className="text-link">Clear all filters →</Link></div>}
 </main>
}
