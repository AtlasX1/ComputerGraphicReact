import React from "react";
import { Card, Row, Col, Figure, Button } from "react-bootstrap";


const CourseInfo = props => {
  return (
    <Row style={{ paddingTop: 100, paddingBottom: 50 }}>
      <Col>
        <Figure>
          <Figure.Image
            width={1440}
            height={600}
            alt={props.Logo}
            src={props.Img}
          />
        </Figure>
      </Col>
      <Col>
        <Card bsStyle="tabs" className="custom-card-courseInfo">
          <Card.Body>
            <Card.Title className="custom-card-courseInfo-title">
              {props.Title}
            </Card.Title>
            <Card.Text className="custom-card-courseInfo-text">
              {props.Text}
            </Card.Text>
            <Button variant="outline-dark" href={props.Link}>Go to module</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default CourseInfo;
