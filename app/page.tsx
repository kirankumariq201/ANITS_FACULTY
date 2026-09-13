import Link from 'next/link';
import { Search, GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { getFacultyStats } from '@/lib/data';

export default async function HomePage() {
  const total = await getFacultyStats();
  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <div className="eyebrow">ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY & SCIENCES</div>
          <h1>Faculty Research & Achievements Portal</h1>
          <p>Explore faculty expertise, research interests, publications, achievements and academic profiles across ANITS.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/faculty"><Search size={18} /> Explore Faculty</Link>
            <a className="button secondary" href="https://www.anits.edu.in/" target="_blank" rel="noreferrer">ANITS Website</a>
          </div>
        </div>
      </section>
      <section className="container stats">
        <div className="stat"><Users /><strong>{total}+</strong><span>Faculty Profiles</span></div>
        <div className="stat"><GraduationCap /><strong>9</strong><span>Departments</span></div>
        <div className="stat"><BookOpen /><strong>2,500+</strong><span>Publications</span></div>
        <div className="stat"><Award /><strong>190+</strong><span>Achievements</span></div>
      </section>
      <section className="container section">
        <div className="section-heading"><div><span className="eyebrow">DISCOVER</span><h2>Find the right faculty</h2></div><Link href="/faculty" className="text-link">View all faculty →</Link></div>
        <div className="feature-grid">
          <Link href="/faculty" className="feature-card"><Search /><h3>Search & Explore</h3><p>Find faculty by name, department or designation.</p></Link>
          <Link href="/faculty?department=CSE" className="feature-card"><GraduationCap /><h3>Departments</h3><p>Browse profiles department by department.</p></Link>
          <Link href="/faculty" className="feature-card"><BookOpen /><h3>Research & Publications</h3><p>Explore academic interests and published work.</p></Link>
        </div>
      </section>
    </main>
  );
}