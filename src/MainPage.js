import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, CardDeck, Jumbotron } from "react-bootstrap";
import MenuBar from "./MenuBar.js";
import MemberInfo from "./MemberInfo.js";
import Courses from "./Courses.js";
//--------------------------------------------------------------Фотографії---------
import ImgVova from "./Vova.jpg";
import ImgRoma from "./Roma.jpg";
import ImgSerhiy from "./Serhiy.jpg";
//----------------------------------------------------------------------------------
const Pad0 = {
  padding: 0,
  margin: 0
};

const BasicExample = () => {
  return (
    <Router>
      <div>
        <Container fluid style={Pad0}>
          <MenuBar />
        </Container>
        <Route exact path="/" component={Home} />
        <Route path="/Courses" component={Courses} />
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <Container fluid style={Pad0}>
      <Container fluid style={Pad0}>
        <Jumbotron fluid>
          <Container>
            <h1>Welcome</h1>
            <p>Some text</p>
          </Container>
        </Jumbotron>
      </Container>
      <Container>
        <CardDeck>
          <MemberInfo
            style={{ width: "18rem" }}
            Img={ImgRoma}
            Name="Моравський Роман"
            Role="Back-end"
          />
          <MemberInfo
            style={{ width: "18rem" }}
            Img={ImgSerhiy}
            Name="Павльо Сергій"
            Role="Front-end"
          />
          <MemberInfo
            style={{ width: "18rem" }}
            Img={ImgVova}
            Name="Морозов Володимер"
            Role="Just good ̶g̶i̶r̶l̶ boy"
          />
        </CardDeck>
      </Container>
    </Container>
  );
};

export default BasicExample;
