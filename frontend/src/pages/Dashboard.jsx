export default function Dashboard() {
  return (
    <section className="card dashboard-card">
      <h2>Dashboard</h2>
      <p>Track click counts and URL activity once analytics are implemented.</p>
      <div className="dashboard-summary">
        <div>
          <strong>Total URLs</strong>
          <span>0</span>
        </div>
        <div>
          <strong>Total Clicks</strong>
          <span>0</span>
        </div>
        <div>
          <strong>Last Accessed</strong>
          <span>—</span>
        </div>
      </div>
    </section>
  );
}
