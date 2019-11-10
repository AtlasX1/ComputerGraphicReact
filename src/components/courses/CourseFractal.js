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
import { Complex, re, im } from "mathjs";

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
uniform int u_colorScheme;

vec2 prod(vec2 left, vec2 right) {
  float r = left.x * right.x - left.y * right.y;
  float i = left.x * right.y + left.y * right.x;
  return vec2(r, i);
}

vec2 prod(vec2 left, vec2 right, vec2 third) {
  return prod(prod(left, right), third);
}

vec2 pow(vec2 x, int n) {
  vec2 result = vec2(x);
  for(int i = 1; i < 10; ++i) {
    if(i >= n) {
      break;
    }
    result = prod(result, x);
  }

  return result;
}

vec2 f(vec2 x, vec2 c) {
  if (u_fractalType == 0) {
    return pow(x, 2) + c;
  }
  else {
    return pow(x, 2) + u_julia_c_value;
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
  vec3 color = vec3(147, 3, 96);
  if(u_colorScheme == 0) 
    gl_FragColor = escaped 
      ? vec4(palette(float(iterations)/float(u_maxIterations), vec3(0.0),vec3(0.59,0.55,0.75),vec3(0.1, 0.2, 0.3),vec3(0.75)),1.0) 
      : vec4(vec3(0.85, 0.99, 1.0), 1.0);
  else
    gl_FragColor = escaped 
      ? vec4(color*float(iterations)/float(u_maxIterations),1.0) 
      : vec4(vec3(0.85, 0.99, 1.0), 1.0);
}`;

// holding info about current frame
var zoom_center = [0.0, 0.0];
var target_zoom_center = [0.0, 0.0];
var zoom_size = 1.0;
var stop_zooming = true;
var zoom_factor = 1.0;
// user input
var max_iterations = 1000;
var autoIter = false;
// 0 - cold ice, 1 - red
var colorSchemeType = 0;
// input c value for julia
var c = [0.0, 0.0];
// 0 - mandelbrot, 1 - julia
var type = 0;
// gl canvas context
var gl;
// uniform location
var zoom_center_uniform;
var zoom_size_uniform;
var max_iterations_uniform;
var fractal_type_uniform;
var julia_value_uniform;
var size_uniform;
var color_scheme_uniform;
// canvas size
var c_width;
var c_height;

// changes zoom factor and let zoom start
function zoom(e) {
  stop_zooming = false;
  zoom_factor = e.buttons & 1 ? 0.99 : 1.01;
}

// changes uniform values and requests animation frame
function renderFrame() {
  const MinAutoFrames = 1000;

  gl.uniform2f(zoom_center_uniform, zoom_center[0], zoom_center[1]);
  gl.uniform1f(zoom_size_uniform, zoom_size);
  gl.uniform1i(max_iterations_uniform, max_iterations);
  gl.uniform2f(julia_value_uniform, c[0], c[1]);
  gl.uniform2f(size_uniform, c_width, c_height);
  gl.uniform1i(fractal_type_uniform, type);
  gl.uniform1i(color_scheme_uniform, colorSchemeType);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  if (!stop_zooming) {
    if (autoIter) {
      max_iterations -= 10;
      if (max_iterations < 50) {
        max_iterations = 50;
      }
    }

    zoom_size *= zoom_factor;
    zoom_center[0] += 0.1 * (target_zoom_center[0] - zoom_center[0]);
    zoom_center[1] += 0.1 * (target_zoom_center[1] - zoom_center[1]);

    window.requestAnimationFrame(renderFrame);
  } else if (autoIter && max_iterations < MinAutoFrames) {
    max_iterations += 10;

    window.requestAnimationFrame(renderFrame);
  }
}

window.onresize = () => {
  c_width = gl.canvas.width;
  c_height = gl.canvas.height;
};

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MaxIteration: max_iterations,
      CurrentMethodName: Mandelbrot,
      SecondMethodName: Julia,
      AutoZoomIter: false,
      ColoureScheme: "Cold ice",
      JuliaConstantValue: 0
    };
  }

  componentDidMount() {
    // gl context settings, shader compiling
    this.InitGlContext();

    let canvas_element = this.refs.canvas;

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
    canvas_element.oncontextmenu = () => {
      return false;
    };
    canvas_element.onmouseup = () => {
      stop_zooming = true;
    };

    // display initial frame
    renderFrame();
  }

  InitGlContext() {
    var canvas_element = this.refs.canvas;
    gl = canvas_element.getContext("webgl");
    c_width = canvas_element.width;
    c_height = canvas_element.height;
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
    color_scheme_uniform = gl.getUniformLocation(
      mandelbrot_program,
      "u_colorScheme"
    );
  }

  // ================== Settings setters ======================================

  valueC = name => {
    if (name.data === Julia) {
      return (
        <ListGroup.Item>
          {" "}
          C value (e.g. -0.4 + 0.6i):
          <InputGroup block>
            <FormControl
              type="string"
              value={this.state.JuliaConstantValue}
              onChange={V => {
                this.setJuliaConstant(V);
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
    zoom_center = [0.0, 0.0];
    target_zoom_center = [0.0, 0.0];
    zoom_size = 1.0;
    stop_zooming = true;
    zoom_factor = 1.0;
    max_iterations = 1000;
    autoIter = false;
    c = [0.0, 0.0];
    this.setState({
      MaxIteration: max_iterations,
      JuliaConstantValue: 0
    });
    renderFrame();
  }
  setJuliaConstant(V) {
    try {
      if (V.target != null) {
        var complex = new Complex(V.target.value);
        console.log(c);
        c[0] = re(complex);
        c[1] = im(complex);
        renderFrame();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ JuliaConstantValue: V.target.value }, () => {
        console.log(this.state.JuliaConstantValue);
      });
    }
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
      this.state.CurrentMethodName === Mandelbrot &&
      this.state.SecondMethodName === Julia
    ) {
      this.setState(
        {
          CurrentMethodName: Julia,
          SecondMethodName: Mandelbrot
        },
        () => {
          console.log(this.state.CurrentMethodName);
          type = 1;
          renderFrame();
        }
      );
    } else {
      this.setState(
        {
          CurrentMethodName: Mandelbrot,
          SecondMethodName: Julia
        },
        () => {
          console.log(this.state.CurrentMethodName);
          type = 0;
          renderFrame();
        }
      );
    }
  }
  setIterations() {
    this.setState({ AutoZoomIter: !this.state.AutoZoomIter }, () => {
      autoIter = this.state.AutoZoomIter;
      renderFrame();
    });
  }
  setZoom(sign) {
    if (sign === "+") {
      zoom({ buttons: 1 });
    } else if (sign === "-") {
      zoom({ buttons: 0 });
    }
    renderFrame();
  }

  // ================== End Setters ===========================================

  render() {
    return (
      <Container fluid style={{ paddingTop: "75px" }}>
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
                        {this.state.CurrentMethodName}
                      </Dropdown.Toggle>

                      <Dropdown.Menu block>
                        <Dropdown.Item
                          block
                          onClick={() => {
                            this.setMethod();
                          }}
                        >
                          {this.state.SecondMethodName}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    Max iterations:
                    <InputGroup className="mb-3" block>
                      <FormControl
                        type="number"
                        step="10"
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
                        label="Auto zoom iterations"
                        defaultChecked={this.state.AutoZoomIter}
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
                  <this.valueC data={this.state.CurrentMethodName} />
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
                    {this.state.CurrentMethodName}
                  </Card.Header>

                  <canvas ref="canvas" width={640} height={480} />
                </Card>
              </CardGroup>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
