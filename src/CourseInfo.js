import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const CourseInfo = props => {
  return (
    <Link to="/Courses">
      <Card style={props.style}>
        <Card.Img variant="top" src={props.Img} block />
        <Card.Body>
          <Card.Title>{props.Name}</Card.Title>
       
        </Card.Body>
        <Card.Footer>see more</Card.Footer>
      </Card>
    </Link>
  );
};
export default CourseInfo;
