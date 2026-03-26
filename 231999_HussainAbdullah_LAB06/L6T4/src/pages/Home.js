import './Pages.css';

function Home() {
  return (
    <div className="page">
      <h1>Welcome to MyWebsite</h1>
      <p>Your one-stop shop for amazing products. We offer quality items at the best prices.</p>
      <div className="home-cards">
        <div className="card">🚀 Fast Delivery</div>
        <div className="card">🔒 Secure Payments</div>
        <div className="card">⭐ Top Rated</div>
      </div>
    </div>
  );
}

export default Home;