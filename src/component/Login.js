import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useAuth } from "../hook/useAuth";

export default function Login() {
  const [errMessage, setErrMessage] = useState();
  const history = useHistory();
  const auth = useAuth();

  const { from } = { from: { pathname: "/" } };
  const validate = (values) => {
    const error = {};
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
    }
    return error;
  };

  const handleSubmit = (values, _, callback) => {
    auth
      .login(values.email, values.password)
      .then(() => {
        history.replace(from);
        callback();
      })
      .catch((error) => {
        callback(error || {});
        if (error === undefined) {
          setErrMessage("Something went wrong");
        } else if (error.status === 422) {
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
      <div className="mx-auto mt-36 lg:w-1/2 xl:max-w-screen-sm">
        <div className="mt-10 px-16 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h1 className="text-4xl">Log In</h1>

          <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
              <div className="mt-12">
                <form onSubmit={handleSubmit} noValidate>
                  <div className={"text-red-500 text-center mb-4 font-bold"}>
                    {errMessage}
                  </div>
                  <div className={"font-bold text-gray-700 tracking-wide"}>
                    Email
                  </div>
                  <Field
                    name="email"
                    render={({ input }) => (
                      <>
                        <input
                          {...input}
                          className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none`}
                          placeholder="example@gmail.com"
                        />
                      </>
                    )}
                  />
                  <div className="mt-8">
                    <div className={"font-bold text-gray-700 tracking-wide"}>
                      Password
                    </div>
                    <Field
                      name="password"
                      render={({ input }) => (
                        <>
                          <input
                            {...input}
                            className={`w-full text-lg py-2 border-b border-gray-300 focus:outline-none`}
                            placeholder="Enter your password"
                            type="password"
                          />
                        </>
                      )}
                    />
                  </div>
                  <p
                    className={[
                      "flex my-3.5 font-display font-semibold text-sm",
                    ]}
                  >
                    Don&apos;t have an account?&nbsp;{" "}
                    <Link to="/sign-up">Sign up</Link>
                  </p>
                  <button
                    className="ui-button rounded-xl tracking-wide font-semibold  font-display focus:outline-none 
                              focus:shadow-outline disabled:opacity-50 transform bg-cyan-500 hover:bg-cyan-700 py-1.5 px-4"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Loading..." : "Log In"}
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
