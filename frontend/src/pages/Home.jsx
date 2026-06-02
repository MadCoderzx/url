import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

export default function Home() {
  return (
    <section className="page-section">
      <div className="layout-grid">
        <UrlForm />
        <UrlList />
      </div>
    </section>
  );
}
