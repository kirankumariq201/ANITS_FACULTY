import Link from 'next/link';
import { GraduationCap, Search } from 'lucide-react';

export function Header() {
  return <header className="site-header"><div className="container nav"><Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={22}/></span><span><strong>ANITS</strong><small>Faculty Portal</small></span></Link><nav className="nav-links"><Link href="/">Home</Link><Link href="/faculty">Faculty</Link><Link href="/departments/CSE">Departments</Link></nav><Link href="/faculty" className="mobile-search" aria-label="Search faculty"><Search size={20}/></Link></div></header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><div><strong>ANITS Faculty Portal</strong><p>Faculty research, publications and achievements directory.</p></div><div className="footer-links"><Link href="/faculty">Faculty Directory</Link><Link href="/departments/CSE">Departments</Link><a href="https://www.anits.edu.in/" target="_blank" rel="noreferrer">ANITS Website</a></div><p>© {new Date().getFullYear()} ANITS</p></div></footer>;
}
