import React from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Container,
  CardGroup,
  ListGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upperLeftX: 0.0,
      upperLeftY: 40.0,
      bottomRightX: 40.0,
      bottomRightY: 0.0,
      upperRight: [40.0, 40.0],
      bottomLeft: [0.0, 0.0],
      rotateAngle: 0.0,
      scaleCoef: 1.0,
      scaleAndRotateAroundItself: false
    };
  }

  componentDidMount() {
    this.drawCoordinateLines();
  }

  clearCanvas = () => {
    let canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.updatePointInputs();
  };

  drawCoordinateLines = () => {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    let offsetX = canvas.width / 2;
    let offsetY = canvas.width / 2;

    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(0, offsetY);
    ctx.lineTo(canvas.width, offsetY);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, canvas.height);
    ctx.stroke();
  };

  drawSquare = () => {
    this.clearCanvas();
    this.drawCoordinateLines();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    let offsetX = canvas.width / 2;
    let offsetY = canvas.height / 2;

    let leftUpperX = offsetX + this.state.upperLeftX;
    let leftUpperY = offsetY - this.state.upperLeftY;

    let bottomLeftX = offsetX + this.state.bottomLeft[0];
    let bottomLeftY = offsetY - this.state.bottomLeft[1];

    let bottomRightX = offsetX + this.state.bottomRightX;
    let bottomRightY = offsetY - this.state.bottomRightY;

    let upperRightX = offsetX + this.state.upperRight[0];
    let upperRightY = offsetY - this.state.upperRight[1];

    ctx.strokeStyle = "red";
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(leftUpperX, leftUpperY);
    ctx.lineTo(bottomLeftX, bottomLeftY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.lineTo(upperRightX, upperRightY);
    ctx.closePath();
    ctx.stroke();

    this.updatePointInputs();

    console.log("upperLeftX  " + this.state.upperLeftX);
    console.log("upperLeftY  " + this.state.upperLeftY);
    console.log("bottomRightX  " + this.state.bottomRightX);
    console.log("bottomRightY  " + this.state.bottomRightY);
  };

  addValueToPoints = (dx, dy) => {
    this.setState(
      {
        upperLeftX: this.state.upperLeftX + dx,
        upperLeftY: this.state.upperLeftY + dy,
        bottomRightX: this.state.bottomRightX + dx,
        bottomRightY: this.state.bottomRightY + dy,
        upperRight: [
          this.state.upperRight[0] + dx,
          this.state.upperRight[1] + dy
        ],
        bottomLeft: [
          this.state.bottomLeft[0] + dx,
          this.state.bottomLeft[1] + dy
        ]
      },
      () => {
        this.drawSquare();
      }
    );
  };

  scalePoints = (cfX, cfY) => {
    this.setState(
      {
        upperLeftX: this.state.upperLeftX * cfX,
        upperLeftY: this.state.upperLeftY * cfY,
        bottomRightX: this.state.bottomRightX * cfX,
        bottomRightY: this.state.bottomRightY * cfY,
        upperRight: [
          this.state.upperRight[0] * cfX,
          this.state.upperRight[1] * cfY
        ],
        bottomLeft: [
          this.state.bottomLeft[0] * cfX,
          this.state.bottomLeft[1] * cfY
        ]
      },
      () => {
        this.drawSquare();
      }
    );
  };

  rotateByAngle = angle => {
    let upperLeft = this.rotatePoint(
      {
        x: this.state.upperLeftX,
        y: this.state.upperLeftY
      },
      angle
    );

    let bottomRight = this.rotatePoint(
      {
        x: this.state.bottomRightX,
        y: this.state.bottomRightY
      },
      angle
    );

    let upperRight = this.rotatePoint(
      {
        x: this.state.upperRight[0],
        y: this.state.upperRight[1]
      },
      angle
    );

    let bottomLeft = this.rotatePoint(
      {
        x: this.state.bottomLeft[0],
        y: this.state.bottomLeft[1]
      },
      angle
    );

    console.log(upperLeft);
    console.log(bottomRight);

    this.setState(
      {
        upperLeftX: upperLeft.x,
        upperLeftY: upperLeft.y,
        bottomRightX: bottomRight.x,
        bottomRightY: bottomRight.y,
        upperRight: [upperRight.x, upperRight.y],
        bottomLeft: [bottomLeft.x, bottomLeft.y]
      },
      () => {
        this.drawSquare();
      }
    );
  };

  updatePointInputs() {
    this.refs.ulx.value = this.state.upperLeftX.toFixed(2);
    this.refs.uly.value = this.state.upperLeftY.toFixed(2);
    this.refs.brx.value = this.state.bottomRightX.toFixed(2);
    this.refs.bry.value = this.state.bottomRightY.toFixed(2);
  }

  rotatePoint(point, angle) {
    let radians = (angle * Math.PI) / 180.0;
    let newX = point.x * Math.cos(radians) + point.y * Math.sin(radians);
    let newY = -point.x * Math.sin(radians) + point.y * Math.cos(radians);

    return { x: newX, y: newY };
  }

  onClearClick = () => {
    this.scalePoints(0.0, 0.0);
    this.clearCanvas();
    this.drawCoordinateLines();
  };

  onBuildClick = () => {
    let ulx = parseFloat(this.refs.ulx.value);
    let uly = parseFloat(this.refs.uly.value);
    let brx = parseFloat(this.refs.brx.value);
    let bry = parseFloat(this.refs.bry.value);

    if (ulx > brx) {
      alert("Left Upper X value cannot be greater than Bottom Right X!");
      return;
    }
    if (bry > uly) {
      alert("Left Upper Y value cannot be less than Bottom Right Y!");
      return;
    }

    this.setState(
      {
        upperLeftX: ulx,
        upperLeftY: uly,
        bottomRightX: brx,
        bottomRightY: bry,
        upperRight: [brx, uly],
        bottomLeft: [ulx, bry]
      },
      () => {
        this.clearCanvas();
        this.drawSquare();
      }
    );
  };

  onRotateClick = () => {
    this.rotateByAngle(this.state.rotateAngle);
  };

  onScaleClicked = () => {
    this.scalePoints(this.state.scaleCoef, this.state.scaleCoef);
  };

  onUpClick = () => {
    this.addValueToPoints(0, 1);
  };

  onDownClick = () => {
    this.addValueToPoints(0, -1);
  };

  onLeftClick = () => {
    this.addValueToPoints(-1, 0);
  };

  onRightClick = () => {
    this.addValueToPoints(1, 0);
  };

  onPointsValueChanged = (inputValueName, value) => {
    this.setState({ [inputValueName]: parseFloat(value) });
  };

  onAngleChanged = value => {
    this.setState({ rotateAngle: parseFloat(value) });
  };

  onScaleCoefChange = value => {
    this.setState({ scaleCoef: parseFloat(value) });
  };

  render() {
    return (
      <Container fluid style={{ paddingTop: "70px" }}>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <CardGroup>
              <Card border="secondary" style={{ width: "0rem" }}>
                <Card.Header align="center">Setting</Card.Header>
                <ListGroup variant="flush">
                  {/* ======================================================================= */}

                  <ListGroup.Item>
                    <Button
                      block
                      onClick={() => {
                        this.onBuildClick();
                      }}
                      variant="outline-secondary"
                    >
                      Build
                    </Button>
                    <Button
                      block
                      onClick={() => {
                        this.onClearClick();
                      }}
                      variant="outline-secondary"
                    >
                      Clear
                    </Button>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        UL X:{" "}
                        <InputGroup className="mb-3" block>
                          <FormControl
                            ref="ulx"
                            type="number"
                            defaultValue="0"
                            style={{ width: "80%" }}
                            onChange={v => {
                              this.onPointsValueChanged(
                                "upperLeftX",
                                v.target.value
                              );
                            }}
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        UL Y:{" "}
                        <InputGroup className="mb-3" block>
                          <FormControl
                            ref="uly"
                            type="number"
                            defaultValue="40"
                            style={{ width: "80%" }}
                            onChange={v => {
                              this.onPointsValueChanged(
                                "upperLeftY",
                                v.target.value
                              );
                            }}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col>
                        BR X:{" "}
                        <InputGroup className="mb-3" block>
                          <FormControl
                            ref="brx"
                            type="number"
                            defaultValue="40"
                            style={{ width: "80%" }}
                            onChange={v => {
                              this.onPointsValueChanged(
                                "bottomRightX",
                                v.target.value
                              );
                            }}
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        BR Y:{" "}
                        <InputGroup className="mb-3" block>
                          <FormControl
                            ref="bry"
                            type="number"
                            defaultValue="0"
                            style={{ width: "80%" }}
                            onChange={v => {
                              this.onPointsValueChanged(
                                "bottomRightY",
                                v.target.value
                              );
                            }}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <InputGroup className="mb-3" block>
                      <FormControl
                        type="number"
                        defaultValue="0"
                        style={{ width: "100%" }}
                        placeholder="rotate rotateAngle"
                        onChange={v => {
                          this.onAngleChanged(v.target.value);
                        }}
                      />
                    </InputGroup>
                    <Button
                      style={{ marginTop: "7px" }}
                      block
                      onClick={() => {
                        this.onRotateClick();
                      }}
                      variant="outline-secondary"
                    >
                      Rotate
                    </Button>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <InputGroup className="mb-3" block>
                      <FormControl
                        type="number"
                        defaultValue="1"
                        step="0.01"
                        style={{ width: "100%" }}
                        placeholder="scale coef."
                        onChange={v => {
                          this.onScaleCoefChange(v.target.value);
                        }}
                      />
                    </InputGroup>
                    <Button
                      style={{ marginTop: "7px" }}
                      block
                      onClick={() => {
                        this.onScaleClicked();
                      }}
                      variant="outline-secondary"
                    >
                      Scale
                    </Button>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Row>
                      <Col
                        md={{ span: 4, offset: 4 }}
                        style={{ padding: "5px" }}
                      >
                        <Button
                          block
                          onClick={() => {
                            this.onUpClick();
                          }}
                          variant="outline-secondary"
                        >
                          &uArr;
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4" style={{ padding: "5px" }}>
                        <Button
                          block
                          onClick={() => {
                            this.onLeftClick();
                          }}
                          variant="outline-secondary"
                        >
                          &lArr;
                        </Button>
                      </Col>
                      <Col md="4" style={{ padding: "5px" }}>
                        <Button
                          block
                          onClick={() => {
                            this.onDownClick();
                          }}
                          variant="outline-secondary"
                        >
                          &dArr;
                        </Button>
                      </Col>
                      <Col md="4" style={{ padding: "5px" }}>
                        <Button
                          block
                          onClick={() => {
                            this.onRightClick();
                          }}
                          variant="outline-secondary"
                        >
                          &rArr;
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                </ListGroup>
              </Card>
            </CardGroup>
          </Col>
          <Col xs lg="5">
            <Container>
              <CardGroup>
                <Card border="secondary" style={{ width: "0rem" }}>
                  <Card.Header align="center">
                    Affine transformations
                  </Card.Header>

                  <canvas ref="canvas" width={580} height={580} />
                </Card>
              </CardGroup>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
