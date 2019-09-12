import React from "react";
import { Card } from "react-bootstrap";
const MemberInfo = props => {
  return (
    <Card style={props.style}>
      <Card.Img variant="top" src={props.Img} block />
      <Card.Body>
        <Card.Title>{props.Name}</Card.Title>
        <Card.Text>{props.Role}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default MemberInfo;
