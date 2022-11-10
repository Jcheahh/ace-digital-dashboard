import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <nav>
        <Link to="/login">Log In</Link>
        <Link to="/sign-up">
          <button type="button">Sign Up</button>
        </Link>
      </nav>
      <div>
        <div>
          <h1>
            <span>Dashboard</span>
            <span>Project</span>
          </h1>
          <p>Create / Login your account to view the project</p>
          <button type="button">It just a button</button>
        </div>
      </div>
    </>
  );
}
