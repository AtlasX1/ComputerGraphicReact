import React from "react";
import {
  Alert,
  Button,
  Row,
  Col,
  Figure,
  Navbar,
  Card,
  Container,
  CardGroup,
  ListGroup
} from "react-bootstrap";

function rgbToHsv(r, g, b) {
  r /= 255;

  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h /= 6;
  }

  return [h, s, v];
}
function hsvToRgb(h, s, v) {
  let r, g, b;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let rgb = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = rgb;
      break;
    case 1:
      r = q;
      g = v;
      b = rgb;
      break;
    case 2:
      r = rgb;
      g = v;
      b = t;
      break;
    case 3:
      r = rgb;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = rgb;
      b = v;
      break;
    case 5:
      r = v;
      g = rgb;
      b = q;
      break;
    default:
      break;
  }

  return [r * 255, g * 255, b * 255];
}
function rgbToCmyk(r, g, b) {
  let c = 0;
  let m = 0;
  let y = 0;
  let k = 0;

  c = 1 - r / 255;
  m = 1 - g / 255;
  y = 1 - b / 255;

  k = Math.min(c, m, y);

  if (k == 1) {
    return [0, 0, 0, 1];
  }

  return [(c - k) / (1 - k), (m - k) / (1 - k), (y - k) / (1 - k), k];
}
function cmykToRgb(c, m, y, k) {
  c = c * (1 - k) + k;
  m = m * (1 - k) + k;
  y = y * (1 - k) + k;

  let r = 1 - c;
  let g = 1 - m;
  let b = 1 - y;

  r = Math.round(255 * r);
  g = Math.round(255 * g);
  b = Math.round(255 * b);

  return [r, g, b];
}

var canvas;
var ctx;
var orgCanvas;
var orgCtx;
var max;
var min;
var blueValue;
var file;
var imagePreviewUrl;
var rgbR = [0, 0, 0];
var hsvR = [0, 0, 0];
var cmykR = [0, 0, 0, 0];
var OrgbR = [0, 0, 0];
var OhsvR = [0, 0, 0];
var OcmykR = [0, 0, 0, 0];
var blueValue = 0;
export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas,
      ctx,
      orgCanvas,
      orgCtx,
      max,
      min,
      blueValue,
      file,
      imagePreviewUrl,
      rgbR,
      hsvR,
      cmykR,
      OrgbR,
      OhsvR,
      OcmykR
    };
  }

  changeBlueBrightness(blueValue, max, min) {
    this.setState({ blueValue: blueValue });
    let imgData = this.state.ctx.getImageData(
      0,
      0,
      this.state.canvas.width,
      this.state.canvas.height
    );
    let orgImgData = this.state.orgCtx.getImageData(
      0,
      0,
      this.state.orgCanvas.width,
      this.state.orgCanvas.height
    );

    let i;
    for (i = 0; i < imgData.data.length; i += 4) {
      let orgBlue = orgImgData.data[i + 2];
      let newBlue;

      if (blueValue >= 0) {
        newBlue = orgBlue + ((255 - orgBlue) / max) * blueValue;
      } else {
        newBlue = orgBlue + (orgBlue / -min) * blueValue;
      }
      imgData.data[i + 2] = newBlue;
    }

    this.state.ctx.putImageData(imgData, 0, 0);
  }
  componentDidMount() {
    this.setState({
      canvas: this.refs.canvas,
      ctx: this.refs.canvas.getContext("2d"),
      orgCanvas: this.refs.originalCanvas,
      orgCtx: this.refs.originalCanvas.getContext("2d")
    });
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseMoveOrig = this.onMouseMoveOrig.bind(this);
  }

  _handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let canvasH = this.state.canvas.height;
      let canvasW = this.state.canvas.width;
      let ctxTmp = this.state.ctx;
      let orgCtxtmp = this.state.orgCtx;
      this.state.ctx.clearRect(0, 0, canvasW, canvasH);
      this.state.orgCtx.clearRect(0, 0, canvasW, canvasH);
      e.preventDefault();
      var fileReader = new FileReader();

      fileReader.onload = function(e) {
        var img = new Image();

        img.addEventListener("load", function() {
          let width;
          let height;

          if (img.width > img.height) {
            width = canvasW;
            height = img.height * (width / img.width);
          } else {
            height = canvasH;
            width = img.width * (height / img.height);
          }

          ctxTmp.drawImage(
            img,
            canvasW / 2 - width / 2,
            canvasH / 2 - height / 2,
            width,
            height
          );

          orgCtxtmp.drawImage(
            img,
            canvasW / 2 - width / 2,
            canvasH / 2 - height / 2,
            width,
            height
          );
        });

        img.src = e.target.result;
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  }

  onMouseMove(e) {
    let pos = this.findPos(this.state.ctx.canvas);
    let ox = e.pageX - pos.x;
    let oy = e.pageY - pos.y;
    let ctx = this.state.ctx.canvas.getContext("2d");
    let rgb = ctx.getImageData(ox, oy, 1, 1).data;
    let hsv = rgbToHsv(rgb[0], rgb[1], rgb[2]);
    let cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);
    this.setState({ rgbR: [...rgb], hsvR: [...hsv], cmykR: [...cmyk] });
  }
  onMouseMoveOrig(e) {
    let pos = this.findPos(this.state.orgCtx.canvas);
    let ox = e.pageX - pos.x;
    let oy = e.pageY - pos.y;
    let ctx = this.state.orgCtx.canvas.getContext("2d");
    let rgb = ctx.getImageData(ox, oy, 1, 1).data;
    let hsv = rgbToHsv(rgb[0], rgb[1], rgb[2]);
    let cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);
    this.setState({ OrgbR: [...rgb], OhsvR: [...hsv], OcmykR: [...cmyk] });
  }
  findPos = obj => {
    var curleft = 0,
      curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return { x: curleft, y: curtop };
    }
    return undefined;
  };
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <Container fluid style={{ paddingTop: "70px" }}>
        <h1>Color Models</h1>
        <Row>
          <Col md="3">
            <Card>
              {" "}
              <Card.Header align="center">Setting</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Button
                      block
                      variant="outline-secondary"
                      onClick={() => {
                        this.setState({ blueValue: 0 });
                        this.changeBlueBrightness(0, 10, -10);
                      }}
                    >
                      Restore
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <input
                      className="fileInput"
                      type="file"
                      onChange={e => this._handleImageChange(e)}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Blue brightness
                    <br />
                    <input
                      id="slider"
                      type="range"
                      value={this.state.blueValue}
                      min="-10"
                      max="10"
                      step="0.1"
                      onChange={v => {
                        this.changeBlueBrightness(v.target.value, 10, -10);
                      }}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      {" "}
                      <p id="text">
                        rgb( {this.state.rgbR[0]}, {this.state.rgbR[1]},{" "}
                        {this.state.rgbR[2]} )
                        <br />
                        hsv( {this.state.hsvR[0].toFixed(2)},{" "}
                        {this.state.hsvR[1].toFixed(2)},{" "}
                        {this.state.hsvR[2].toFixed(2)} )
                        <br />
                        cmyk( {this.state.cmykR[0].toFixed(2)},{" "}
                        {this.state.cmykR[1].toFixed(2)},{" "}
                        {this.state.cmykR[2].toFixed(2)},{" "}
                        {this.state.cmykR[3].toFixed(2)} )
                        <br />
                        Original:
                        <br />
                        rgb( {this.state.OrgbR[0]}, {this.state.OrgbR[1]},{" "}
                        {this.state.OrgbR[2]} )
                        <br />
                        hsv( {this.state.OhsvR[0].toFixed(2)},{" "}
                        {this.state.OhsvR[1].toFixed(2)},{" "}
                        {this.state.OhsvR[2].toFixed(2)} )
                        <br />
                        cmyk( {this.state.OcmykR[0].toFixed(2)},{" "}
                        {this.state.OcmykR[1].toFixed(2)},{" "}
                        {this.state.OcmykR[2].toFixed(2)},{" "}
                        {this.state.OcmykR[3].toFixed(2)} )
                      </p>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md="9">
            <Card>
              <Card.Header align="center">Color Models</Card.Header>
              <CardGroup>
                <Card style={{ borderWidth: "0px" }}>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      <canvas
                        onMouseMove={this.onMouseMove}
                        ref="canvas"
                        width="400"
                        height="500"
                      ></canvas>
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ borderWidth: "0px" }}>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      <canvas
                        onMouseMove={this.onMouseMoveOrig}
                        ref="originalCanvas"
                        width="400"
                        height="500"
                      ></canvas>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
