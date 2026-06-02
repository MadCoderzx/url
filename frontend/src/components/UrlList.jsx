import { getBackendBaseUrl } from '../api/apiClient';
import PropTypes from 'prop-types';

export default function UrlList({ urls, loading, error, onDelete, deletingId }) {
  const backendOrigin = getBackendBaseUrl();

  function formatDate(dateString) {
    if (!dateString) {
      return '—';
    }
    return new Date(dateString).toLocaleString();
  }

  return (
    <section className="card">
      <h2>Your URLs</h2>
      <p>Saved URLs for this browser will appear here.</p>
      {loading && <p>Loading URLs…</p>}
      {error && !loading && <p className="form-error">{error}</p>}
      {!loading && urls.length === 0 && (
        <div className="placeholder-list">
          <div className="placeholder-item">No URLs yet</div>
        </div>
      )}
      {!loading && urls.length > 0 && (
        <div className="url-list">
          {urls.map((url) => (
            <div key={url.id} className="url-item">
              <div>
                <a href={`${backendOrigin}/${url.short_code}`} target="_blank" rel="noreferrer">
                  {backendOrigin}/{url.short_code}
                </a>
                <p>{url.original_url}</p>
                <div className="url-meta">
                  <span>Created: {formatDate(url.created_at)}</span>
                  <span>Last accessed: {formatDate(url.last_accessed_at)}</span>
                </div>
              </div>
              <div className="url-actions">
                <div className="click-count">Clicks: {url.click_count}</div>
                {onDelete && (
                  <button
                    type="button"
                    className="secondary-button"
                    disabled={deletingId === url.id}
                    onClick={() => onDelete(url.id)}
                  >
                    {deletingId === url.id ? 'Deleting…' : 'Delete'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

UrlList.propTypes = {
  urls: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  deletingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
