import { useEffect, useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import Dashboard from './Dashboard';
import { fetchUrls, createUrl, deleteUrl } from '../api/apiClient';

export default function Home({ clientId }) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createdUrl, setCreatedUrl] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function loadUrls() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchUrls(clientId);
      setUrls(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUrls();
  }, [clientId]);

  async function handleCreateUrl(originalUrl) {
    setError(null);
    try {
      const created = await createUrl({ originalUrl, clientId });
      setCreatedUrl(created);
      setUrls((prevUrls) => [created, ...prevUrls]);
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleDeleteUrl(id) {
    setError(null);
    setDeletingId(id);
    try {
      await deleteUrl(id, clientId);
      setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="page-section">
      <div className="layout-grid">
        <UrlForm
          onCreate={handleCreateUrl}
          createdUrl={createdUrl}
          error={error}
          loading={loading}
        />
        <UrlList
          urls={urls}
          loading={loading}
          error={error}
          onDelete={handleDeleteUrl}
          deletingId={deletingId}
        />
      </div>
      <Dashboard urls={urls} />
    </section>
  );
}
