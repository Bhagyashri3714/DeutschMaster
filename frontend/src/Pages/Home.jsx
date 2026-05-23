import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "90vh" }}
    >
      <h1 className="display-2 fw-bold">DeutschMaster</h1>

      <p className="lead mt-3 mb-4" style={{ maxWidth: "700px" }}>
        From first words to confident conversations — your German journey begins here.
      </p>

      <Link to="/login" className="btn btn-primary btn-lg px-5">
        Get Started
      </Link>
    </div>
  );
}

export default Home;