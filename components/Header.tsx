import Link from 'next/link';
import { GraduationCap, Menu } from 'lucide-react';
export default function Header(){return <header className="site-header"><div className="container nav"><Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={22}/></span><span>ANITS Faculty Portal<small>Research & Achievements</small></span></Link><nav className="nav-links"><Link href="/">Home</Link><Link href="/faculty">Faculty</Link><Link href="/faculty?department=CSE">Departments</Link></nav><Menu className="mobile-menu" size={24}/></div></header>}
