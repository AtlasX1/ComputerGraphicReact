import React from "react";
import { Card, Row, Col, Figure, Button } from "react-bootstrap";


const CourseInfo = props => {
  return (
    <Row style={{ backgroundColor:"#fff",  padding: "220px 0"}}>
      <div style={{display: "flex", alignItems:"center", justifyContent: "center", backgroundColor: "#002850", width: "700px", height: "700px", borderRadius: "30px"}}>
        <Figure>
          <Figure.Image
            style={{borderRadius:"60px"}}
            width={500}
            height={375}
            alt={props.Logo}  
            src={props.Img}
          />
        </Figure>
      </div>
      <Col style={{display: "flex",alignItems:"center", justifyContent: "flex-end", textAlign: "right"}}>
        <Card bsStyle="tabs" className="custom-card-courseInfo" style={{width: "640px", margin:0 }} >
          <Card.Body>
            <Card.Title style={{fontSize: "60px"}} className="custom-card-courseInfo-title">
              {props.Title}
            </Card.Title>
            <Card.Text style={{fontSize: "24px"}} className="custom-card-courseInfo-text">
              {props.Text}
            </Card.Text>
            <Button style={{marginTop:"50px", fontSize: "30px"}} variant="outline-dark" href={props.Link}>Go to module</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default CourseInfo;
