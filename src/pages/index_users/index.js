import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./index.css";
import api from "../../service/api";

import SideBar from "../../components/sidebar/index";
import ModalEditUserComponent from "../../components/modal_edit_user/index";
import ModalUserComponent from "../../components/modal_insert_user/index";

export default function IndexUsers(props) {
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);

  const useStyles = makeStyles({
    table: {
      minWidth: 1250,
      backgroundColor: "#EAEAEA",
    },
  });
  const classes = useStyles();

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
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">Nome do Usuario</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Senha</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.username}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.password}</TableCell>
                        <div style={{ display: "flex", margin: "10px" }}>
                          <ModalEditUserComponent
                            idUser={row.id}
                            resetIndex={indexUsers}
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
    </div>
  );
}
