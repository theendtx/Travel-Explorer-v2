import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="page home-page">
      <div className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Travel Explorer</span>
          <h1>Discover countries in a fresh, animated travel experience.</h1>
          <p>
            Explore destinations, save favorites, and plan dream trips inside a
            modern interface with warm gradients and motion.
          </p>

          <div className="hero-actions">
            <Link to="/explore" className="button-primary">
              Start exploring
            </Link>
            <Link to="/trips" className="button-secondary">
              Plan a trip
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-stat">
            <strong>190+</strong>
            <span>Countries to discover</span>
          </div>
          <div className="hero-stat">
            <strong>Smart</strong>
            <span>Favorites, filters, and polished search</span>
          </div>
          <div className="hero-stat">
            <strong>Smooth</strong>
            <span>Hover cards and page transitions</span>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <h2>Search with clarity</h2>
          <p>Find countries faster with responsive search and simple filters.</p>
        </article>
        <article className="feature-card">
          <h2>Save what inspires you</h2>
          <p>Build a personal favorites list for your next destination shortlist.</p>
        </article>
        <article className="feature-card">
          <h2>Plan your route</h2>
          <p>Turn travel ideas into organized trips without leaving the app.</p>
        </article>
      </div>
    </section>
  );
}
