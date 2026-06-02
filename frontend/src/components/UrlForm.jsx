import { useState } from 'react';
import { getBackendBaseUrl } from '../api/apiClient';

export default function UrlForm({ onCreate, createdUrl, error, loading }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const backendOrigin = getBackendBaseUrl();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!originalUrl.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    try {
      const created = await onCreate(originalUrl.trim());
      setSuccessMessage(`Created short URL: ${backendOrigin}/${created.short_code}`);
      setOriginalUrl('');
    } catch {
      // Error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopy() {
    if (!createdUrl) return;
    const shortUrl = `${backendOrigin}/${createdUrl.short_code}`;
    await navigator.clipboard.writeText(shortUrl);
    setSuccessMessage('Copied short URL to clipboard!');
  }

  return (
    <section className="card">
      <h2>Create a Short URL</h2>
      <p>Enter a long URL here and create a short link.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Original URL
          <input
            type="url"
            placeholder="https://example.com/very/long/url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isSubmitting || loading || !originalUrl.trim()}>
          {isSubmitting ? 'Creating…' : 'Create URL'}
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
      {createdUrl && (
        <div className="created-url">
          <p>
            Short URL:{' '}
            <a href={`${backendOrigin}/${createdUrl.short_code}`} target="_blank" rel="noreferrer">
              {backendOrigin}/{createdUrl.short_code}
            </a>
          </p>
          <button type="button" className="secondary-button" onClick={handleCopy}>
            Copy link
          </button>
        </div>
      )}
      {successMessage && <p className="form-success">{successMessage}</p>}
    </section>
  );
}
