import React, { useState, useEffect } from "react";

import "./index.css";
import api from "../../service/api";

import SideBar from "../../components/sidebar/index";
import ModalEditUserComponent from "../../components/modal_edit_user/index";
import ModalUserComponent from "../../components/modal_insert_user/index";

export default function IndexUsers(props) {
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    indexUsers();
    setId(props);
  }, []);

  async function indexUsers() {
    const data = await api.get("/users");
    setUsers(data.data);
  }

  async function handleDelete(id, event) {
    event.preventDefault();
    await api.delete(`/users/${id}`);
    indexUsers();
  }

  return (
    <div>
      <SideBar />
      <div className="container">
        <ModalUserComponent refreshUsers={indexUsers} />
        <div className="row">
          <div className="col-xl">
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table table-hover mb-0">
                <tbody>
                  <tr className="thead-dark">
                    <th>ID</th>
                    <th>Nome do Usuario</th>
                    <th>Email</th>
                    <th>Senha</th>
                  </tr>

                  {users.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td>{data.password}</td>

                      <div style={{ display: "flex", margin: "10px" }}>
                        <ModalEditUserComponent
                          idUser={data.id}
                          resetIndex={indexUsers}
                        />
                        <div style={{ display: "flex", margin: "10px" }}></div>
                        <button
                          className="btn btn-danger"
                          onClick={(event) => handleDelete(data.id, event)}
                        >
                          Deletar
                        </button>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
