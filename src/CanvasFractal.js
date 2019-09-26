import React from "react";
function rect(props) {
  const { ctx, x, y, width, height } = props;
  ctx.fillRect(x, y, width, height);
}
export default class CanvasFractal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { state: 0 };
  }
  componentDidMount() {
    const canvasHeight = document.getElementById("CardBody1").clientHeight;
    const canvasWidth = document.getElementById("CardBody1").clientWidth;
    this.setState({ canvasWidth, canvasHeight });
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);

    rect({ ctx, x: 10, y: 10, width: this.state.canvasWidth, height: this.state.canvasHeight });
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
