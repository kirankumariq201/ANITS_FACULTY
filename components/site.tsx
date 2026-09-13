import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Header() { return <header className="site-header"><div className="container nav"><Link href="/" className="brand"><span className="brand-mark"><GraduationCap size={22}/></span><span><strong>ANITS</strong><small>Faculty Portal</small></span></Link><nav><Link href="/">Home</Link><Link href="/faculty">Faculty</Link></nav></div></header>; }
export function Footer() { return <footer><div className="container footer-inner"><div><strong>ANITS Faculty Portal</strong><p>Faculty research and achievements directory.</p></div><p>© {new Date().getFullYear()} ANITS</p></div></footer>; }