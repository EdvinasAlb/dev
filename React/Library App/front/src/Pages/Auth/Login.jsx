import { useContext, useEffect, useState } from "react";
import useLogin from "../../Hooks/useLogin";
import { Auth } from "../../Contexts/Auth";
import { SITE_URL, AFTER_LOGIN_URL } from "../../Constants/main";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setInputs } = useLogin();
  const { user } = useContext(Auth);

  const go = (_) => {
    setInputs({ username, password });
    setPassword("");
  };

  useEffect(
    (_) => {
      if (user) {
        window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
      }
    },
    [user]
  );

  if (!user) {
    return (
      <div className="login-page">
        <div className="card login-card">
          <div className="card-header">
            <h1>Login</h1>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwrod" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  onClick={go}
                >
                  GO
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
