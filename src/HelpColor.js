import React from "react";
import {
  Modal,
  Button,
  ButtonToolbar,
  Col,
  Figure,
  Navbar,
  Nav
} from "react-bootstrap";

const ModalDialog = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Help Color
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Instruction</h4>
        <p>Some text or img</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const HelpInfomation = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button variant="outline-light" onClick={() => setModalShow(true)}>
        Help
      </Button>

      <ModalDialog show={modalShow} onHide={() => setModalShow(false)} />
    </ButtonToolbar>
  );
};

export default class HelpFarctal extends React.Component {
  render() {
    return <HelpInfomation />;
  }
}
