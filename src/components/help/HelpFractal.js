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
          Fractal art
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Instruction</h4>
        <p>
          Restore defaults - sets zoom center and zoom size to default values.
          Zoom center = [0;0], zoom size = 1.0 (no zoom).
        </p>
        <p>
          Mandelbrot set / Julia set dropdown changes rendering fractal type to
          corresponding.
        </p>
        <p>
          Max iterations - value that represents number of calculations
          performed for each x, y point in the plot area.
        </p>
        <p>Auto zoom iterations - speeds up rendering when zooming.</p>
        <p>
          Color scheme dropdown - changes color of rendered fractal. Two scheme
          available: 'Cold ice' and 'Pink'.
        </p>
        <p>
          When rendering Julia set, you can enter constant value for this
          fractal in the following format: x + yi. This will change fractal
          form.{" "}
        </p>
        <p>
          '+' and '-' buttons turn on zooming. To stop zooming process press any
          zoom button again or click left mouse button anywhere on the fractal
          canvas.
        </p>
        <p>
          You can also zoom by clicking left mouse button on the fractal canvas.
          Zoom size changes according to the time left mouse button has been
          held down.
        </p>
        <p>To save and download clicl right mouse button on fractal canvas.</p>
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
