export default function Loading() {
  return <main className="container profile" aria-busy="true">
    <section className="profile-card">
      <div className="loading-photo" />
      <div className="loading-copy">
        <div className="loading-line short" />
        <div className="loading-line title" />
        <div className="loading-line" />
        <div className="loading-line" />
      </div>
    </section>
    <div className="detail-grid">
      <section className="detail-card wide-card"><div className="loading-line title" /><div className="loading-line" /><div className="loading-line" /></section>
      <section className="detail-card"><div className="loading-line title" /><div className="loading-line" /><div className="loading-line" /></section>
      <section className="detail-card"><div className="loading-line title" /><div className="loading-line" /><div className="loading-line" /></section>
    </div>
  </main>;
}
