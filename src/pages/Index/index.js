import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/index";
import "./index.css";

import ModalComponent from "../../components/modal_insert/index";
import ModalEditComponent from "../../components/modal_edit/index";

import api from "../../service/api";

export default function IndexPage(props) {
  let [idFromUser, setIdFromUser] = useState("");
  let [dataIndex, setDataIndex] = useState([]);

  useEffect(() => {
    dataCeps();
    setIdFromUser(props.location.state.idUser);
  }, [idFromUser]);

  async function dataCeps() {
    const clientList = await api.get(`/cep`);
    let data = clientList.data;
    const { ceps } = data;
    setDataIndex(ceps);
  }

  async function handleDelete(id, event) {
    event.preventDefault();
    await api.delete(`/cep/${id}`);
    await dataCeps();
  }

  return (
    <>
      <div className="app">
        <SideBar
          userId={idFromUser}
          className="col-12 col-md-3 col-xl-2 bd-sidebar"
        />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl">
            <ModalComponent inserCep={dataCeps} />
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table table-hover mb-0">
                <tbody>
                  <tr className="thead-dark">
                    <th>Cep</th>
                    <th>Logradouro</th>
                    <th>Complemento</th>
                    <th>Bairro</th>
                    <th>Localidade</th>
                    <th>UF</th>
                    <th>IBGE</th>
                    <th>GIA</th>
                    <th>DDD</th>
                    <th>SIAFI</th>
                  </tr>

                  {dataIndex.map((data) => (
                    <tr key={data.id}>
                      <td>{data.cep}</td>
                      <td>{data.logradouro}</td>
                      <td>{data.complemento}</td>
                      <td>{data.bairro}</td>
                      <td>{data.localidade}</td>
                      <td>{data.uf}</td>
                      <td>{data.ibge}</td>
                      <td>{data.gia}</td>
                      <td>{data.ddd}</td>
                      <td>{data.siafi}</td>
                      <div style={{ display: "flex", margin: "10px" }}>
                        <ModalEditComponent
                          idCep={data.id}
                          refreshIndex={dataCeps}
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
    </>
  );
}
