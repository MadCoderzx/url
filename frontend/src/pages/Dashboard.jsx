import PropTypes from 'prop-types';

export default function Dashboard({ urls = [] }) {
  const totalClicks = urls.reduce((sum, url) => sum + (url.click_count || 0), 0);
  const lastAccessed = urls
    .map((url) => url.last_accessed_at)
    .filter(Boolean)
    .sort()
    .reverse()[0];

  return (
    <section className="card dashboard-card">
      <h2>Dashboard</h2>
      <p>Track click counts and URL activity once analytics are implemented.</p>
      <div className="dashboard-summary">
        <div>
          <strong>Total URLs</strong>
          <span>{urls.length}</span>
        </div>
        <div>
          <strong>Total Clicks</strong>
          <span>{totalClicks}</span>
        </div>
        <div>
          <strong>Last Accessed</strong>
          <span>{lastAccessed ? new Date(lastAccessed).toLocaleString() : '—'}</span>
        </div>
      </div>
    </section>
  );
}

Dashboard.propTypes = {
  urls: PropTypes.array
};
