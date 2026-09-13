import Link from 'next/link';
import { Search, GraduationCap, Users, BookOpen, Award, ArrowRight } from 'lucide-react';
import { getPortalStats } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const stats = await getPortalStats();
  return <main>
    <section className="hero"><div className="container hero-inner">
      <div className="eyebrow">ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY & SCIENCES</div>
      <h1>Discover ANITS faculty, research & achievements.</h1>
      <p>A searchable academic directory connecting students, researchers and collaborators with faculty expertise, publications and achievements across ANITS.</p>
      <div className="hero-actions"><Link className="button primary" href="/faculty"><Search size={18}/> Explore Faculty</Link><a className="button secondary" href="https://www.anits.edu.in/" target="_blank" rel="noreferrer">Official ANITS Website</a></div>
    </div></section>
    <section className="container stats">
      <div className="stat"><Users/><strong>{stats.faculty}</strong><span>Faculty Profiles</span></div>
      <div className="stat"><GraduationCap/><strong>{stats.departments}</strong><span>Departments</span></div>
      <div className="stat"><BookOpen/><strong>{stats.publications.toLocaleString()}</strong><span>Publications</span></div>
      <div className="stat"><Award/><strong>{stats.achievements.toLocaleString()}</strong><span>Achievements</span></div>
    </section>
    <section className="container section"><div className="section-heading"><div><span className="eyebrow">EXPLORE</span><h2>Everything in one place</h2></div><Link href="/faculty" className="text-link">Browse directory <ArrowRight size={16}/></Link></div>
      <div className="feature-grid">
        <Link href="/faculty" className="feature-card"><Search/><h3>Find a faculty member</h3><p>Search the complete faculty directory by name and department.</p></Link>
        <Link href="/departments/CSE" className="feature-card"><GraduationCap/><h3>Explore departments</h3><p>Open department directories and discover faculty expertise.</p></Link>
        <Link href="/faculty" className="feature-card"><BookOpen/><h3>Research & publications</h3><p>Explore research interests, publications, achievements and academic links.</p></Link>
      </div>
    </section>
  </main>;
}
