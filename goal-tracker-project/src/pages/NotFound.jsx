import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();
    
  return (
    <div className="page-notfound">
    <h1>404 - Page Not Found</h1>

<button
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
      </div>
  )}
export default NotFound;