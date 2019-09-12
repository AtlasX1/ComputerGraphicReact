import React from "react";
import {
  Alert,
  Button,
  Row,
  Col,
  Container,
  Figure,
  Card,
  CardDeck,
  Jumbotron
} from "react-bootstrap";
import ImgVova from "./Vova.jpg";
import ImgRoma from "./Roma.jpg";
import ImgSerhiy from "./Serhiy.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const Pad0 = {
  padding: 0,
  margin: 0
};
const SizeImg = {
  height: 50,
  weight: 50
};
const ImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Symbol_from_Marvel%27s_The_Avengers_logo.svg/1200px-Symbol_from_Marvel%27s_The_Avengers_logo.svg.png";

function App() {
  return (
    <Container fluid style={Pad0}>
      <Container fluid style={Pad0}>
        <Alert variant="dark ">
          <Row className="show-grid" float="center" style={Pad0}>
            <Col>
              <Figure style={Pad0}>
                <Figure.Image
                  width={50}
                  height={50}
                  alt="Logo"
                  src={ImageUrl}
                  style={Pad0}
                />
              </Figure>
            </Col>
            <Col md={{ span: 1 }} style={Pad0}>
              <Button block style={{ marginTop: 10}}>
                {" "}
                Course{" "}
              </Button>
            </Col>
          </Row>
        </Alert>
      </Container>

      <Jumbotron fluid>
        <Container>
          <h1>Welcome</h1>
          <p>Some text</p>
        </Container>
      </Jumbotron>

      <Container>
        <CardDeck>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={ImgRoma} block />
            <Card.Body>
              <Card.Title>Моравський Роман</Card.Title>
              <Card.Text>Back-end</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={ImgSerhiy} />
            <Card.Body>
              <Card.Title>Павльо Сергій </Card.Title>
              <Card.Text>Front-end</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={ImgVova} />
            <Card.Body>
              <Card.Title>Морозов Володимер</Card.Title>
              <Card.Text>Just good ̶g̶i̶r̶l̶ boy</Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    </Container>
  );
}

export default App;
