import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Phone, ExternalLink, BookOpen, Award, Users, Link2 } from 'lucide-react';
import { getFacultyById, getFacultyChildren } from '@/lib/data';

export default async function FacultyProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faculty = await getFacultyById(decodeURIComponent(id));
  if (!faculty) notFound();
  const { publications, achievements, memberships, links } = await getFacultyChildren(faculty.id);
  const designation = (faculty.designation || 'Faculty').replace(/\s*\|\s*None\s*$/i, '');
  return <main className="container page-space">
    <Link href="/faculty" className="back"><ArrowLeft size={16}/> Back to directory</Link>
    <section className="profile-hero">
      <div className="profile-photo">{faculty.photo ? <img src={faculty.photo} alt={faculty.name}/> : <span>{faculty.name.charAt(0)}</span>}</div>
      <div><span className="dept">{faculty.department}</span><h1>{faculty.name}</h1><p className="role">{designation}</p><div className="contact-row">{faculty.email && <a href={`mailto:${faculty.email}`}><Mail size={16}/> {faculty.email}</a>}{faculty.phone && <a href={`tel:${faculty.phone}`}><Phone size={16}/> {faculty.phone}</a>}</div><div className="contact-row">{faculty.profile_url && <a href={faculty.profile_url} target="_blank" rel="noreferrer"><ExternalLink size={16}/> Official profile</a>}{faculty.irins_url && <a href={faculty.irins_url} target="_blank" rel="noreferrer"><ExternalLink size={16}/> IRINS</a>}</div></div>
    </section>
    <div className="profile-grid">
      <section className="content-card"><h2>Academic Profile</h2><dl>{faculty.qualification && <><dt>Qualification</dt><dd>{faculty.qualification}</dd></>}{faculty.teaching_experience && <><dt>Teaching experience</dt><dd>{faculty.teaching_experience}</dd></>}{faculty.research_interests && <><dt>Research interests</dt><dd>{faculty.research_interests}</dd></>}</dl></section>
      <section className="content-card"><h2><BookOpen size={20}/> Publications <span>{publications.length}</span></h2>{publications.length ? <div className="list">{publications.slice(0, 20).map((p: any) => <article key={p.id}><h3>{p.title || 'Untitled publication'}</h3>{p.authors && <p>{p.authors}</p>}<small>{[p.venue, p.year ? String(p.year) : null, p.cited_by ? `Citations: ${p.cited_by}` : null].filter(Boolean).join(' • ')}</small>{p.url && <a href={p.url} target="_blank" rel="noreferrer">View publication <ExternalLink size={14}/></a>}</article>)}</div> : <p className="muted">No publications listed.</p>}</section>
      <section className="content-card"><h2><Award size={20}/> Achievements <span>{achievements.length}</span></h2>{achievements.length ? <div className="list">{achievements.map((a: any) => <article key={a.id}><h3>{a.title || 'Achievement'}</h3>{a.description && <p>{a.description}</p>}{a.year && <small>{a.year}</small>}{a.url && <a href={a.url} target="_blank" rel="noreferrer">View source <ExternalLink size={14}/></a>}</article>)}</div> : <p className="muted">No achievements listed.</p>}</section>
      <section className="content-card"><h2><Users size={20}/> Memberships <span>{memberships.length}</span></h2>{memberships.length ? <ul className="chips">{memberships.map((m: any) => <li key={m.id}>{m.membership}</li>)}</ul> : <p className="muted">No memberships listed.</p>}</section>
      {links.length > 0 && <section className="content-card"><h2><Link2 size={20}/> Additional links</h2><div className="links">{links.map((l: any) => <a key={l.id} href={l.url} target="_blank" rel="noreferrer">{l.label || l.url} <ExternalLink size={14}/></a>)}</div></section>}
    </div>
  </main>;
}