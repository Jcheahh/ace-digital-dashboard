import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useAuth } from "../hook/useAuth";

export default function SignUp() {
  const history = useHistory();
  const auth = useAuth();
  const [errMessage, setErrMessage] = useState();

  const { from } = { from: { pathname: "/" } };

  const validate = (values) => {
    const error = {};
    if (!values.userName) {
      error.userName = "Please enter your UserName";
    } else if (values.userName.length < 2) {
      error.userName = "Your UserName is too short";
    }

    if (!values.email) {
      error.email = "Fill in your email";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email
      )
    ) {
      // Check email
      error.email = "Please enter a vaild email address";
    }

    if (!values.password) {
      error.password = "Please enter your password";
    } else if (values.password.length < 8) {
      error.password = "Your password too short";
    }

    return error;
  };

  const handleSubmit = (values, _, callback) => {
    auth
      .signup(values.userName, values.email, values.password)
      .then(() => {
        history.replace(from);
        callback();
      })
      .catch((error) => {
        callback({});
        if (error.status === 422) {
          setErrMessage("Invalid email address or password");
        } else {
          setErrMessage(error.data.message);
        }
      });
  };

  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-3 px-6 bg-transparent sm:items-baseline w-full container">
        <div className="mb-2 sm:mb-0">
          <Link to="/" className={["text-xl font-bold"]}>
            To home
          </Link>
        </div>
      </nav>
      <div className="mx-auto mt-24 lg:w-1/2 xl:max-w-screen-sm">
        <div className="mt-10 px-16 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h3 className="text-4xl">Sign Up</h3>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
              <div className="mt-12">
                <form onSubmit={handleSubmit} noValidate>
                  <div className={"text-red-500 text-center mb-4 font-bold"}>
                    {errMessage}
                  </div>
                  <div className="mt-3">
                    {/* <div className=" px-3 mb-6 md:mb-0"> */}
                    <div
                      className={
                        "font-bold text-gray-700 tracking-wide text-sm"
                      }
                    >
                      UserName
                    </div>
                    <Field
                      name="userName"
                      render={({ input, meta }) => (
                        <>
                          <input
                            {...input}
                            className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                              meta.touched && !!meta.error
                                ? "border-red-500"
                                : ""
                            }`}
                            placeholder="Doe"
                            id="userName"
                            name="userName"
                            autoComplete="userName"
                          />
                          {meta.touched && !!meta.error && (
                            <p className="text-red-500 text-xs italic text-sm">
                              {meta.error}
                            </p>
                          )}
                        </>
                      )}
                    />
                    {/* </div> */}
                  </div>
                  <div className="mt-8">
                    <div
                      className={
                        "font-bold text-gray-700 tracking-wide text-sm"
                      }
                    >
                      Email
                    </div>
                    <Field
                      name="email"
                      render={({ input, meta }) => (
                        <>
                          <input
                            {...input}
                            className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                              meta.touched && !!meta.error
                                ? "border-red-500"
                                : ""
                            }`}
                            placeholder="example@gmail.com"
                            id="email"
                            name="email"
                            autoComplete="email"
                          />
                          {meta.touched && !!meta.error && (
                            <p className="text-red-500 text-xs italic text-sm">
                              {meta.error}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="mt-8">
                    <div
                      className={
                        "font-bold text-gray-700 tracking-wide text-sm"
                      }
                    >
                      Password
                    </div>
                    <Field
                      name="password"
                      render={({ input, meta }) => (
                        <>
                          <input
                            {...input}
                            className={[
                              `w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                                meta.touched && !!meta.error
                                  ? "border-red-500"
                                  : ""
                              }`,
                            ]}
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                          />
                          {meta.touched && !!meta.error && (
                            <p className="text-red-500 text-xs italic text-sm">
                              {meta.error}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <p
                    className={[
                      "flex my-3.5 font-display font-semibold text-sm",
                    ]}
                  >
                    Already have an account?&nbsp;{" "}
                    <Link to="/login">Log In</Link>
                  </p>
                  <button
                    className="ui-button rounded-xl tracking-wide font-semibold  font-display focus:outline-none 
                              focus:shadow-outline disabled:opacity-50 transform bg-cyan-500 hover:bg-cyan-700 py-1.5 px-4"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Loading..." : "Sign Up"}
                  </button>
                </form>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}
