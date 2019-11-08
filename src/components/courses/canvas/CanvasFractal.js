import React from "react";
import {
  Card,
  Button,
  Row,
  Col,
  FormControl,
  Badge,
  InputGroup,
  CardGroup,
  Container,
  DropdownButton,
  Dropdown
} from "react-bootstrap";

export default class CanvasFractal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasHeight: 0,
      canvasWidth: 0
    };
  }

  componentDidMount() {
    const canvasHeight = 480;
    const canvasWidth = 640;
    this.setState({ canvasWidth, canvasHeight });

    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  strokeCanvas(ctx) {
    ctx.strokeRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
  }

  render() {
    return (
      <CardGroup>
        <Card border="secondary" style={{ width: "0rem" }}>
          <Card.Header align="center">{this.props.name}</Card.Header>
          <canvas
            ref="canvas"
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}
          />
        </Card>
      </CardGroup>
    );
  }
}
