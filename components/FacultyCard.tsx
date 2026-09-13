import Link from 'next/link';
import { Faculty } from '@/lib/data';
export default function FacultyCard({faculty}:{faculty:Faculty}){return <Link href={`/faculty/${encodeURIComponent(faculty.id)}`} className="faculty-card"><img className="faculty-photo" src={faculty.photo || '/placeholder.svg'} alt={faculty.name}/><h3>{faculty.name}</h3><div className="designation">{(faculty.designation||'Faculty').split('|')[0].trim()}</div><div className="dept">{faculty.department}</div>{faculty.email&&<div className="email">{faculty.email}</div>}</Link>}
