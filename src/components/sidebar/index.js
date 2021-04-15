import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../service/auth";
import logo from "../../assets/logo.png";

import "./index.css";

export default function SideBar(props) {
  const history = useHistory();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(props.userId);
    console.log(id);
  }, [id]);

  async function moveToUserIndex() {
    history.push("/indexusers");
  }

  async function moveToUserIndexCeps() {
    history.push("/index");
  }

  async function exitLogout() {
    logout();
    history.push("/");
  }

  return (
    <aside className="app-sidebar">
      <p>
        <img src={logo} alt="logo" />
      </p>

      <footer>
        <div>
          <button onClick={moveToUserIndexCeps} type="button">
            Lista de Ceps
          </button>
        </div>

        <br />

        <div>
          <button onClick={moveToUserIndex} type="button">
            Lista de usuarios
          </button>
        </div>

        <br />
        <button type="button" onClick={exitLogout}>
          Logout
        </button>
      </footer>
    </aside>
  );
}
