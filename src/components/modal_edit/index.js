import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

import api from "../../service/api";

export default function ModalEditComponent(props) {
  const [show, setShow] = useState(false);

  const [id, setId] = useState("");

  let [cep, setCep] = useState("");
  let [logradouro, setLogradouro] = useState("");
  let [complemento, setComplemento] = useState("");
  let [bairro, setBairro] = useState("");
  let [localidade, setLocalidade] = useState("");
  let [uf, setUf] = useState("");
  let [ibge, setIbge] = useState("");
  let [gia, setGia] = useState("");
  let [ddd, setDdd] = useState("");
  let [siafi, setSiafi] = useState("");

  const handleClose = () => setShow(false);

  async function handleShow() {
    const cepEdit = await api.get(`/cep/${props.idCep}`);
    setId(props.idCep);
    setCep(cepEdit.data["cep"]);
    setLogradouro(cepEdit.data["logradouro"]);
    setComplemento(cepEdit.data["complemento"]);
    setBairro(cepEdit.data["bairro"]);
    setLocalidade(cepEdit.data["localidade"]);
    setUf(cepEdit.data["uf"]);
    setIbge(cepEdit.data["ibge"]);
    setGia(cepEdit.data["gia"]);
    setDdd(cepEdit.data["ddd"]);
    setSiafi(cepEdit.data["siafi"]);

    setShow(true);
  }

  async function handleSubmitEdit(id, event) {
    event.preventDefault();
    try {
      let data = {
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf,
        ibge,
        gia,
        ddd,
        siafi,
      };
      console.log(data);
      await api.put(`/cep/${id}`, data);
      await handleClose();
      await props.refreshIndex();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button className="botao" variant="warning" onClick={handleShow}>
        Editar
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
                <Form.Label>Cep</Form.Label>
                <Form.Control
                  value={"" || cep}
                  onChange={(event) => {
                    setCep(event.target.value);
                  }}
                />

                <Form.Label>Logadouro</Form.Label>
                <Form.Control
                  value={"" || logradouro}
                  onChange={(event) => {
                    setLogradouro(event.target.value);
                  }}
                />

                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  value={"" || complemento}
                  onChange={(event) => {
                    setComplemento(event.target.value);
                  }}
                />

                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  value={"" || bairro}
                  onChange={(event) => {
                    setBairro(event.target.value);
                  }}
                />

                <Form.Label>Localidade</Form.Label>
                <Form.Control
                  value={"" || localidade}
                  onChange={(event) => {
                    setLocalidade(event.target.value);
                  }}
                />

                <Form.Label>Uf</Form.Label>
                <Form.Control
                  value={"" || uf}
                  onChange={(event) => {
                    setUf(event.target.value);
                  }}
                />

                <Form.Label>Ibge</Form.Label>
                <Form.Control
                  value={"" || ibge}
                  onChange={(event) => {
                    setIbge(event.target.value);
                  }}
                />

                <Form.Label>Gia</Form.Label>
                <Form.Control
                  value={"" || gia}
                  onChange={(event) => {
                    setGia(event.target.value);
                  }}
                />

                <Form.Label>DDD</Form.Label>
                <Form.Control
                  value={"" || ddd}
                  onChange={(event) => {
                    setDdd(event.target.value);
                  }}
                />

                <Form.Label>Siafi</Form.Label>
                <Form.Control
                  value={"" || siafi}
                  onChange={(event) => {
                    setSiafi(event.target.value);
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
