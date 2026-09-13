import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container">
      <section className="page-head">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p className="muted">
          The page you requested could not be found.
        </p>
        <Link href="/" className="button primary">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
