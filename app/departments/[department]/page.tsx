import Link from 'next/link';
import { DEPARTMENTS, getFaculty } from '@/lib/data';
import FacultyCard from '@/components/FacultyCard';
import { notFound } from 'next/navigation';

export default async function DepartmentPage({params}:{params:Promise<{department:string}>}){
 const {department}=await params;
 const name=decodeURIComponent(department).toUpperCase();
 if(!DEPARTMENTS.includes(name)) notFound();
 const faculty=await getFaculty({department:name});
 return <main className="container"><section className="page-head"><Link href="/faculty" className="text-link">← All faculty</Link><span className="eyebrow" style={{display:'block',marginTop:24}}>DEPARTMENT</span><h1>{name}</h1><p>{faculty.length} faculty profiles in {name}.</p></section><div className="faculty-grid">{faculty.map(f=><FacultyCard key={f.id} faculty={f}/>)}</div></main>;
}

export function generateStaticParams(){return DEPARTMENTS.map(department=>({department}));}
