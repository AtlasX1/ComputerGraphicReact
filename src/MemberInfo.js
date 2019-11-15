import React from "react";
import { Card, Container } from "react-bootstrap";
const MemberInfo = props => {
  return (
    <Container fluid>
    <Card style={props.style}>
      <Card.Img style={{borderRadius: "50px"}} src={props.Img}  />
      <Card.Body>
        <Card.Title style={{textAlign: "center", fontSize: "24px"}} align="center">{props.Name}</Card.Title>
        <Card.Text style={{textAlign: "center", fontSize: "18px"}}>{props.Role}</Card.Text>
      </Card.Body>
    </Card>
    </Container>
  );
};
export default MemberInfo;
