import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
      <h1>Log In</h1>

      <Form
        onSubmit={handleSubmit}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <div className="mt-12">
            <form onSubmit={handleSubmit} noValidate>
              <div>Email</div>
              <Field
                name="email"
                render={({ input }) => (
                  <>
                    <input {...input} placeholder="example@gmail.com" />
                  </>
                )}
              />
              <div className="mt-8">
                <div>Password</div>
                <Field
                  name="password"
                  render={({ input }) => (
                    <>
                      <input
                        {...input}
                        placeholder="Enter your password"
                        type="password"
                      />
                    </>
                  )}
                />
              </div>
              <button type="submit" disabled={submitting}>
                Log in
              </button>
            </form>
          </div>
        )}
      />
    </>
  );
}
