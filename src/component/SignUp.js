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
      <nav />
      <div>
        <div>
          <h3>Sign Up</h3>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
              <div>
                <form onSubmit={handleSubmit} noValidate>
                  <div>
                    <div>
                      <div>UserName</div>
                      <Field
                        name="userName"
                        render={({ input, meta }) => (
                          <>
                            <input
                              {...input}
                              placeholder="Doe"
                              id="userName"
                              name="userName"
                              autoComplete="userName"
                            />
                            {meta.touched && !!meta.error && (
                              <p>{meta.error}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <div>Email</div>
                    <Field
                      name="email"
                      render={({ input, meta }) => (
                        <>
                          <input
                            {...input}
                            placeholder="example@gmail.com"
                            id="email"
                            name="email"
                            autoComplete="email"
                          />
                          {meta.touched && !!meta.error && <p>{meta.error}</p>}
                        </>
                      )}
                    />
                  </div>
                  <div>
                    <div>Password</div>
                    <Field
                      name="password"
                      render={({ input, meta }) => (
                        <>
                          <input
                            {...input}
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                          />
                          {meta.touched && !!meta.error && <p>{meta.error}</p>}
                        </>
                      )}
                    />
                  </div>
                  <div>
                    Already have an account?&nbsp;{" "}
                    <Link to="/login">Log In</Link>
                  </div>
                  <button type="submit" disabled={submitting}>
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
