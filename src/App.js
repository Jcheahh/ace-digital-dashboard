import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import System from "./component/System";
import LandingPage from "./component/LandingPage";
import { useAuth, useProvideAuth, authContext } from "./hook/useAuth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <>
      <ProvideAuth>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <ProtectedRoute path="/car">
              <System />
            </ProtectedRoute>
            <HomeRoute exact path="/">
              <System />
            </HomeRoute>
          </Switch>
        </Router>
      </ProvideAuth>
    </>
  );
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function CheckLoggedIn(renderComponent) {
  return function Component({ children, ...rest }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const auth = useAuth();
    useEffect(() => {
      if (auth.token !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <Route
        {...rest}
        render={(routerProps) =>
          isLoggedIn ? (
            <>
              <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
                <div class="container flex flex-wrap justify-between items-center mx-auto">
                  <a href="/" class="flex items-center">
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                      Home
                    </span>
                  </a>
                  <div
                    class="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                  >
                    <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                      <li>
                        {auth.user ? (
                          <li role="none">
                            <p className="block py-2 pr-4 pl-3 text-gray-700 rounded md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400">
                              Welcome, {auth.user.userName}!
                            </p>
                          </li>
                        ) : (
                          <li role="none">
                            <p className="block py-2 pr-4 pl-3 text-gray-700 rounded md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400">
                              Welcome!
                            </p>
                          </li>
                        )}
                      </li>
                      <li>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-100 blocktext-sm w-full text-left"
                          onClick={() =>
                            auth.signout().then(() => {
                              routerProps.history.replace("/login");
                            })
                          }
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              {children}
            </>
          ) : (
            renderComponent(routerProps)
          )
        }
      />
    );
  };
}

const HomeRoute = CheckLoggedIn(() => <LandingPage />);
const ProtectedRoute = CheckLoggedIn(() => <Redirect to="/login" />);

export default App;
