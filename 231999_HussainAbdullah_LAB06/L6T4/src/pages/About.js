import './Pages.css';

function About() {
  return (
    <div className="page">
      <h1>About Us</h1>
      <p>
        MyWebsite was founded in 2020 with a mission to provide high-quality products
        to customers worldwide. We believe in transparency, reliability, and excellent
        customer service.
      </p>
      <p>
        Our team of dedicated professionals works hard to ensure you get the best
        shopping experience possible. From product selection to delivery, we've got you covered.
      </p>
      <div className="about-stats">
        <div className="stat"><h2>500+</h2><p>Products</p></div>
        <div className="stat"><h2>10k+</h2><p>Customers</p></div>
        <div className="stat"><h2>50+</h2><p>Countries</p></div>
      </div>
    </div>
  );
}

export default About;