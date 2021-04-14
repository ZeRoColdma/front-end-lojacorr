import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

import api from "../../service/api";

export default function ModalComponent(props) {
  const [show, setShow] = useState(false);
  let [cep, setCep] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(event) {
    event.preventDefault();
    let data = {
      cep,
    };
    await api.post("/cep", data);
    await handleClose();
    props.inserCep();
  }

  return (
    <>
      <Button style={{ margin: "20px" }} variant="primary" onClick={handleShow}>
        Novo Registro
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        id="modalstyle"
      >
        <Modal.Header closeButton>
          <Modal.Title>Novo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Cep de Pesquisa</Form.Label>
                <Form.Control
                  value={cep}
                  onChange={(event) => {
                    setCep(event.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
