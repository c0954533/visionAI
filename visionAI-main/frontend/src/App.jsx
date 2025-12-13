import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Upload from "./pages/Upload.jsx";
import History from "./pages/History.jsx";
import Result from "./pages/Result.jsx";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo">
          <div className="nav-logo-badge">VAI</div>
          <span>VisionAI</span>
        </div>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Upload
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            History
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/history" element={<History />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
    </div>
  );
}
