import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-3 px-6 bg-transparent sm:items-baseline w-full container">
        <p>
          <Link className={"mr-4 font-semibold leading-normal"} to="/login">
            Log In
          </Link>
          <Link to="/sign-up">
            <button type="button">Sign Up</button>
          </Link>
        </p>
      </nav>
      <div className="flex justify-center">
        <div className="text-left max-w-2xl py-14">
          <h1>
            <span className="text-6xl text-gray-700 block">
              Dashboard Project
            </span>
          </h1>
          <p className="py-3 text-2xl">
            <Link to="/sign-up">
              <button type="button">Create</button>
            </Link>{" "}
            /{" "}
            <Link to="/login">
              <button type="button">Login</button>
            </Link>{" "}
            your account to view the project
          </p>
          <button
            className="ui-button rounded-xl tracking-wide font-semibold  font-display focus:outline-none 
                              focus:shadow-outline disabled:opacity-50 transform bg-cyan-500 hover:bg-cyan-700 py-4 px-10 text-xl"
            type="button"
          >
            It just a button
          </button>
        </div>
      </div>
    </>
  );
}
