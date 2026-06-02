export default function UrlForm() {
  return (
    <section className="card">
      <h2>Create a Short URL</h2>
      <p>Enter a long URL here and create a short link once the API is ready.</p>
      <form>
        <label>
          Original URL
          <input type="url" placeholder="https://example.com/very/long/url" disabled />
        </label>
        <button type="button" disabled>
          Create URL
        </button>
      </form>
    </section>
  );
}
