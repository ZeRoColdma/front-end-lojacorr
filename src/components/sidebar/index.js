import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../service/auth";
import logo from "../../assets/logo.png";

import ModalEditUserComponent from "../../components/modal_edit_user/index";

import "./index.css";

export default function SideBar(props) {
  const history = useHistory();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(props.userId);
    console.log(id);
  }, []);

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
          <ModalEditUserComponent idUser={id} />
        </div>
        <br />
        <button type="button" onClick={exitLogout}>
          Logout
        </button>
      </footer>
    </aside>
  );
}
