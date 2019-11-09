import React from "react";
import {
  Card,
  Button,
  Row,
  Col,
  FormControl,
  InputGroup,
  CardGroup,
  Container,
  Form,
  Dropdown,
  ListGroup
} from "react-bootstrap";
import CanvasFractal from "./canvas/CanvasFractal.js";
const Julia = "Julia set";
const Mandelbrot = "Mandelbrot set";

const vs_shader = `precision highp float;
attribute vec2 a_Position;
void main() {
  gl_Position = vec4(a_Position.x, a_Position.y, 0.0, 1.0);
}`;

const fs_shader = `precision highp float;
uniform vec2 u_zoomCenter;
uniform float u_zoomSize;
uniform int u_maxIterations;
uniform int u_fractalType;
uniform vec2 u_julia_c_value;
uniform vec2 u_size;

vec2 f(vec2 x, vec2 c) {
  if (u_fractalType == 0) {
    return mat2(x,-x.y,x.x)*x + c;
  }
  else {
    return mat2(x,-x.y,x.x)*x + u_julia_c_value;
  }
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b*cos( 6.28318*(c*t+d) );
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_size;
  vec2 c = u_zoomCenter + (uv * 4.0 - vec2(2.0)) * (u_zoomSize);

  vec2 x;
  if(u_fractalType == 0) {
    x = vec2(0.0);
  }
  else {
    x = c;
  }

  bool escaped = false;
  int iterations = 0;
  for (int i = 0; i < 1000000; i++) {
    if (i > u_maxIterations) break;
    iterations = i;
    x = f(x, c);
    if (length(x) > 2.0) {
      escaped = true;
      break;
    }
  }
  gl_FragColor = escaped ? vec4(palette(float(iterations)/float(u_maxIterations), vec3(0.0),vec3(0.59,0.55,0.75),vec3(0.1, 0.2, 0.3),vec3(0.75)),1.0) : vec4(vec3(0.85, 0.99, 1.0), 1.0);
}`;

var zoom_center = [0.0, 0.0];
var target_zoom_center = [0.0, 0.0];
var zoom_size = 1.0;
var stop_zooming = true;
var zoom_factor = 1.0;
var max_iterations = 1000;
var autoIter = false;
var gl;
var zoom_center_uniform;
var zoom_size_uniform;
var max_iterations_uniform;
var fractal_type_uniform;
var julia_value_uniform;
var size_uniform;
var c_width;
var c_height;
var c = [-0.4, 0.6];
var type = 0;

function zoom(e) {
  stop_zooming = false;
  zoom_factor = e.buttons & 1 ? 0.99 : 1.01;
}

var renderFrame = function() {
  /* bind inputs & render frame */
  gl.uniform2f(zoom_center_uniform, zoom_center[0], zoom_center[1]);
  gl.uniform1f(zoom_size_uniform, zoom_size);
  gl.uniform1i(max_iterations_uniform, max_iterations);
  gl.uniform2f(julia_value_uniform, c[0], c[1]);
  gl.uniform2f(size_uniform, c_width, c_height);
  gl.uniform1i(fractal_type_uniform, type);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  /* handle zoom */
  if (!stop_zooming) {
    console.log("zooming: " + max_iterations);
    /* zooming in progress */
    /* gradually decrease number of iterations, reducing detail, to speed up rendering */
    if (autoIter) {
      max_iterations -= 10;
      if (max_iterations < 50) max_iterations = 50;
    }
    /* zoom in */
    zoom_size *= zoom_factor;

    /* move zoom center towards target */
    zoom_center[0] += 0.1 * (target_zoom_center[0] - zoom_center[0]);
    zoom_center[1] += 0.1 * (target_zoom_center[1] - zoom_center[1]);

    window.requestAnimationFrame(renderFrame);
  } else if (max_iterations < 500) {
    console.log("stop zooming: " + max_iterations);
    if (autoIter) {
      /* once zoom operation is complete, bounce back to normal detail level */
      max_iterations += 10;
    }
    window.requestAnimationFrame(renderFrame);
  }
};

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MaxIteration: max_iterations,
      MethodName1: Mandelbrot,
      MethodName2: Julia,
      AutoMaxIter: false,
      ColoureScheme: "Blue gradient",
      C_Vlue: 0,
      Zoom: 50
    };
  }

  componentDidMount() {
    var canvas_element = this.refs.canvas;
    gl = canvas_element.getContext("webgl");
    c_width = canvas_element.width;
    c_height = canvas_element.height;

    console.log(this);

    var vertex_shader_src = vs_shader;
    var fragment_shader_src = fs_shader;
    var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertex_shader, vertex_shader_src);
    gl.shaderSource(fragment_shader, fragment_shader_src);

    gl.compileShader(vertex_shader);
    console.log(gl.getShaderInfoLog(vertex_shader));
    gl.compileShader(fragment_shader);
    console.log(gl.getShaderInfoLog(fragment_shader));

    var mandelbrot_program = gl.createProgram();
    gl.attachShader(mandelbrot_program, vertex_shader);
    gl.attachShader(mandelbrot_program, fragment_shader);
    gl.linkProgram(mandelbrot_program);
    gl.useProgram(mandelbrot_program);
    var vertex_buf = gl.createBuffer(gl.ARRAY_BUFFER);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    var position_attrib_location = gl.getAttribLocation(
      mandelbrot_program,
      "a_Position"
    );
    gl.enableVertexAttribArray(position_attrib_location);
    gl.vertexAttribPointer(position_attrib_location, 2, gl.FLOAT, false, 0, 0);

    zoom_center_uniform = gl.getUniformLocation(
      mandelbrot_program,
      "u_zoomCenter"
    );
    zoom_size_uniform = gl.getUniformLocation(mandelbrot_program, "u_zoomSize");
    max_iterations_uniform = gl.getUniformLocation(
      mandelbrot_program,
      "u_maxIterations"
    );
    fractal_type_uniform = gl.getUniformLocation(
      mandelbrot_program,
      "u_fractalType"
    );
    julia_value_uniform = gl.getUniformLocation(
      mandelbrot_program,
      "u_julia_c_value"
    );
    size_uniform = gl.getUniformLocation(mandelbrot_program, "u_size");

    /* input handling */
    canvas_element.onmousedown = function(e) {
      var x_part = e.offsetX / canvas_element.width;
      var y_part = e.offsetY / canvas_element.height;
      target_zoom_center[0] =
        zoom_center[0] - zoom_size / 2.0 + x_part * zoom_size;
      target_zoom_center[1] =
        zoom_center[1] + zoom_size / 2.0 - y_part * zoom_size;
      console.log(target_zoom_center);
      zoom(e);
      renderFrame();
      return true;
    };
    canvas_element.oncontextmenu = function(e) {
      return false;
    };
    canvas_element.onmouseup = function(e) {
      stop_zooming = true;
    };

    /* display initial frame */
    renderFrame();
  }

  valueC = name => {
    if (name.data === Julia) {
      return (
        <ListGroup.Item>
          {" "}
          Value C:
          <InputGroup block>
            <FormControl
              type="number"
              step="0.5"
              min="0"
              value={this.state.C_Vlue}
              onChange={V => {
                this.setVlueC(V);
              }}
            />
          </InputGroup>
        </ListGroup.Item>
      );
    } else {
      return null;
    }
  };
  clickRestore() {
    alert("Restore");
  }
  setVlueC(V) {
    this.setState({ C_Vlue: V.target.value }, () => {
      console.log(this.state.C_Vlue);
    });
  }
  setMaxIterations(V) {
    this.setState({ MaxIteration: V.target.value }, () => {
      max_iterations = this.state.MaxIteration;
      console.log("Max iter: " + max_iterations);
      renderFrame();
    });
  }
  setMethod() {
    if (
      this.state.MethodName1 === Mandelbrot &&
      this.state.MethodName2 === Julia
    ) {
      this.setState(
        {
          MethodName1: Julia,
          MethodName2: Mandelbrot
        },
        () => {
          console.log(this.state.MethodName1);
          type = 1;
          renderFrame();
        }
      );
    } else {
      this.setState(
        {
          MethodName1: Mandelbrot,
          MethodName2: Julia
        },
        () => {
          console.log(this.state.MethodName1);
          type = 0;
          renderFrame();
        }
      );
    }
  }
  setIterations() {
    let tmp1 = this.state.AutoMaxIter;
    tmp1 = tmp1 ? false : true;
    this.setState({ AutoMaxIter: tmp1 }, () => {
      console.log(this.state.AutoMaxIter);
      autoIter = tmp1;
      renderFrame();
    });
  }
  setZoom(sign) {
    let Zoom = this.state.Zoom;

    if (sign === "+") {
      zoom({ buttons: 1 });
    } else if (sign === "-") {
      zoom({ buttons: 0 });
    }
    this.setState({ Zoom: Zoom }, () => {
      console.log(this.state.Zoom);
      renderFrame();
    });
  }
  render() {
    return (
      <Container fluid style={{ paddingTop: "75px" }}>
        <Row>
          <Col lg="2">
            <CardGroup>
              <Card border="secondary" style={{ width: "0rem" }}>
                <Card.Header align="center">Setting</Card.Header>
                <ListGroup variant="flush">
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Button
                      block
                      variant="outline-secondary"
                      onClick={() => {
                        this.clickRestore();
                      }}
                    >
                      Restore defaults
                    </Button>
                    <br />
                    <Dropdown block>
                      <Dropdown.Toggle block variant="outline-secondary">
                        {this.state.MethodName1}
                      </Dropdown.Toggle>

                      <Dropdown.Menu block>
                        <Dropdown.Item
                          block
                          onClick={() => {
                            this.setMethod();
                          }}
                        >
                          {this.state.MethodName2}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    Max itrations:
                    <InputGroup className="mb-3" block>
                      <FormControl
                        type="number"
                        step="1"
                        min="0"
                        value={this.state.MaxIteration}
                        onChange={V => {
                          this.setMaxIterations(V);
                        }}
                      />
                    </InputGroup>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="Auto max iterations"
                        defaultChecked={this.state.AutoMaxIter}
                        onChange={() => {
                          this.setIterations();
                        }}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    Colour scheme:
                    <Dropdown block>
                      <Dropdown.Toggle block variant="outline-secondary">
                        {this.state.ColoureScheme}
                      </Dropdown.Toggle>
                      <Dropdown.Menu block>
                        <Dropdown.Item block onClick={() => {}}>
                          {this.state.ColoureScheme}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          block
                          variant="outline-secondary"
                          style={{ fontSize: "24px", paddingTop: "0px" }}
                          onClick={() => {
                            this.setZoom("+");
                          }}
                        >
                          +
                        </Button>
                      </Col>
                      <Col>
                        {" "}
                        <Button
                          block
                          variant="outline-secondary"
                          style={{ fontSize: "24px", paddingTop: "0px" }}
                          onClick={() => {
                            this.setZoom("-");
                          }}
                        >
                          -
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <this.valueC data={this.state.MethodName1} />
                  {/* ======================================================================= */}
                </ListGroup>
              </Card>
            </CardGroup>
          </Col>
          <Col lg="10">
            <CardGroup>
              <Card border="secondary" style={{ width: "0rem" }}>
                <Card.Header align="center">
                  {this.state.MethodName1}
                </Card.Header>
                <canvas ref="canvas" width={640} height={480} />
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
