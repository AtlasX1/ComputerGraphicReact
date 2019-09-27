import React from "react";

export default class CanvasFractal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasHeight: 0,
      canvasWidth: 0
    };
  }

  componentDidMount() {
    const canvasHeight = 480; //document.getElementById("CardBody1").clientHeight;
    const canvasWidth = 640; //document.getElementById("CardBody1").clientWidth;
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

    //this.strokeCanvas(ctx);
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.state.canvasWidth}
        height={this.state.canvasHeight}
      />
    );
  }
}
