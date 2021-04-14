import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

import logo from "../../assets/lojacorr.png";

import api from "../../service/api";

export default function RegisterPage() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleRegisterUser(event) {
    event.preventDefault();

    const data = await api.post("/users", { username, email, password });
    history.push("/");

    return data;
  }

  return (
    <>
      <div className="container-fluid">
        <div style={{ marginTop: "10%" }}>
          <form onSubmit={handleRegisterUser}>
            <div className="wrapper fadeInDown">
              <div className="App-header">
                <div className="App-logo img-fluid">
                  <img src={logo} alt="logo" />
                </div>
                <div className="cardinput">
                  <div>
                    <input
                      type="text"
                      id="name"
                      className="fadeIn second"
                      name="username"
                      placeholder="Nome"
                      value={username || ""}
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
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
