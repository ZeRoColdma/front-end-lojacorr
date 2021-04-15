import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

import api from "../../service/api";

export default function ModalEditUserComponent(props) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    setId(props.idUser);
  }, [id]);

  let [username, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleClose = () => setShow(false);

  async function handleShow() {
    // console.log("Usuario da Lista");
    // console.log(props.idUser);
    // console.log("Usuario da Lista");

    const userEdit = await api.get(`/users/${id}`);
    setId(props.idUser);
    setUserName(userEdit.data["username"]);
    setEmail(userEdit.data["email"]);
    setPassword("");
    setShow(true);
  }

  async function handleSubmitEdit(id, event) {
    event.preventDefault();
    try {
      let data = {
        username,
        email,
        password,
      };
      await api.put(`/users/${id}`, data);
      handleClose();
      props.resetIndex();
    } catch (error) {
      alert("Email ja registrado!");
    }
  }

  return (
    <>
      <button className="btn btn-warning" onClick={handleShow}>
        Editar Usuario
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        id="modalstyle"
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nome do Usuario</Form.Label>
                <Form.Control
                  value={"" || username}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />

                <Form.Label>Email do Usuario</Form.Label>
                <Form.Control
                  value={"" || email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />

                <Form.Label>Nova Senha</Form.Label>
                <Form.Control
                  value={"" || password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={(event) => handleSubmitEdit(id, event)}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
