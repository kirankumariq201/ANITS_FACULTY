import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/components/site';

export const metadata: Metadata = {
  title: 'ANITS Faculty Portal',
  description: 'Faculty research, publications and achievements portal for ANITS.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}