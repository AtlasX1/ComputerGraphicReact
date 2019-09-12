import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
import Courses from "./Courses.js";
import ImgVova from "./Vova.jpg";
import ImgRoma from "./Roma.jpg";
import ImgSerhiy from "./Serhiy.jpg";
import MenuBar from "./MenuBar.js";
import MemberInfo from "./MemberInfo.js";
const Pad0 = {
  padding: 0,
  margin: 0
};

function BasicExample() {
  return (
    <Router>
      <div>
        <Container fluid style={Pad0}>
          <MenuBar />
        </Container>
        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/Courses" component={Courses} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <Container fluid style={Pad0}>
      <Container fluid style={Pad0}>
        <Jumbotron fluid>
          <Container>
            <h1>Welcome</h1>
            <p>Some text</p>
          </Container>
        </Jumbotron>
      </Container>F
      <Container>
        <CardDeck>
            <MemberInfo style={{width: "18rem" }} Img={ImgRoma} Name="Моравський Роман" Role="Back-end"/>
            <MemberInfo style={{width: "18rem" }} Img={ImgSerhiy} Name="Павльо Сергій" Role="Front-end"/>
            <MemberInfo style={{width: "18rem" }} Img={ImgVova} Name="Морозов Володимер" Role="Just good ̶g̶i̶r̶l̶ boy"/>
        </CardDeck>
      </Container>
    </Container>
  );
}

export default BasicExample;
