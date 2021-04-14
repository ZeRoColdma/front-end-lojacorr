import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../service/auth";
import logo from "../../assets/logo.png";

import "./index.css";

export default function SideBar() {
  const history = useHistory();

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
        <button type="button" onClick={exitLogout}>
          Logout
        </button>
      </footer>
    </aside>
  );
}
