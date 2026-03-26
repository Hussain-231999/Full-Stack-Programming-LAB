import { Link } from 'react-router-dom';
import './Pages.css';

function NotFound() {
  return (
    <div className="page center">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="back-link">← Go Back Home</Link>
    </div>
  );
}

export default NotFound;