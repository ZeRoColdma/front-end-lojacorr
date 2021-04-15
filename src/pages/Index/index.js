import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SideBar from "../../components/sidebar/index";
import "./index.css";

import ModalComponent from "../../components/modal_insert/index";
import ModalEditComponent from "../../components/modal_edit/index";

import api from "../../service/api";

export default function IndexPage(props) {
  let [idFromUser, setIdFromUser] = useState("");
  let [dataIndex, setDataIndex] = useState([]);

  const useStyles = makeStyles({
    table: {
      minWidth: 1250,
      backgroundColor: "#EAEAEA",
    },
  });
  const classes = useStyles();

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
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Cep</TableCell>
                      <TableCell align="right">Logradouro</TableCell>
                      <TableCell align="right">Complemento</TableCell>
                      <TableCell align="right">Bairro</TableCell>
                      <TableCell align="right">Localidade</TableCell>
                      <TableCell align="right">UF</TableCell>
                      <TableCell align="right">IBGE</TableCell>
                      <TableCell align="right">GIA</TableCell>
                      <TableCell align="right">DDD</TableCell>
                      <TableCell align="right">SIAFI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataIndex.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="right">{row.cep}</TableCell>
                        <TableCell align="right">{row.logradouro}</TableCell>
                        <TableCell align="right">{row.complemento}</TableCell>
                        <TableCell align="right">{row.bairro}</TableCell>
                        <TableCell align="right">{row.localidade}</TableCell>
                        <TableCell align="right">{row.uf}</TableCell>
                        <TableCell align="right">{row.ibge}</TableCell>
                        <TableCell align="right">{row.gia}</TableCell>
                        <TableCell align="right">{row.ddd}</TableCell>
                        <TableCell align="right">{row.siafi}</TableCell>
                        <div style={{ display: "flex", margin: "10px" }}>
                          <ModalEditComponent
                            idCep={row.id}
                            refreshIndex={dataCeps}
                          />
                          <div
                            style={{ display: "flex", margin: "10px" }}
                          ></div>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={(event) => handleDelete(row.id, event)}
                          >
                            Deletar
                          </Button>
                        </div>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
