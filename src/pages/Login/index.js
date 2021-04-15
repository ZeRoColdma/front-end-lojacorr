import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

import logo from "../../assets/lojacorr.png";

import { login } from "../../service/auth";
import api from "../../service/api";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const data = await api.post("/session", { email, password });
      const { token } = data.data;
      login(data.data.token.token);
      api.defaults.headers["Authorization"] = `Bearer ${token.token}`;
      history.push({
        pathname: `/index/`,
        state: { idUser: data.data.user_id },
      });
    } catch (error) {
      alert("Algo de errado aconteceu... Tente novamente");
    }
  }

  async function handleRegisterUser(event) {
    history.push("/register");
  }

  return (
    <>
      <div className="container-fluid">
        <div style={{ marginTop: "10%" }}>
          <form onSubmit={handleLogin}>
            <div className="wrapper fadeInDown">
              <div className="App-header">
                <div className="App-logo img-fluid">
                  <img src={logo} alt="logo" />
                </div>
                <div className="cardinput">
                  <div>
                    <input
                      type="text"
                      id="login"
                      className="fadeIn second"
                      name="cnpj"
                      placeholder="Email"
                      value={email || ""}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      autoComplete="false"
                      type="password"
                      id="password"
                      className="fadeIn third"
                      name="login"
                      placeholder="password"
                      value={password || ""}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <button
                      style={{ marginLeft: "5px", marginTop: "15px" }}
                      className="btn btn-primary btn-block fadeIn fourth"
                      type="submit"
                    >
                      Entrar
                    </button>
                  </div>

                  <div style={{ justifyItems: "start", marginTop: "25px" }}>
                    <button
                      className="btn btn-link"
                      onClick={handleRegisterUser}
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
