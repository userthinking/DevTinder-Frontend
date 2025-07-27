import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoginPath = location.pathname === "/login";
  const [isLogin, setIsLogin] = useState(isLoginPath);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Keep route and isLogin state in sync
  useEffect(() => {
    setIsLogin(isLoginPath);
    setError(""); // Clear error on route change
  }, [isLoginPath]);

  const handleSubmit = async () => {
    setError("");
    if (!emailId || !password || (!isLogin && (!firstName || !lastName))) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const url = isLogin ? `${BASE_URL}/login` : `${BASE_URL}/signup`;
      const payload = isLogin
        ? { emailId, password }
        : { firstName, lastName, emailId, password };

      const res = await axios.post(url, payload, { withCredentials: true });

      dispatch(addUser(res.data.user));
      if (isLogin) {
        navigate("/");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "Something went wrong.";
      setError(errMsg);
    }
  };

  const toggleForm = () => {
    const targetPath = isLogin ? "/signup" : "/login";
    navigate(targetPath); // update the route
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Signup"}
          </h2>

          <div className="flex flex-col gap-2">
            {!isLogin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>
              </>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>

            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
          </div>

          <div className="card-actions flex flex-col items-center mt-2">
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              {isLogin ? "Login" : "Signup"}
            </button>
            <button className="btn btn-link text-sm mt-2" onClick={toggleForm}>
              {isLogin
                ? "Don't have an account? Signup"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
