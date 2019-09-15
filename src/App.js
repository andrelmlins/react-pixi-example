import React from "react";
import { Stage, Container, NineSlicePlane } from "@inlet/react-pixi";

import Soccer from "./Soccer";

const App = () => (
  <Stage
    width={document.body.clientWidth}
    height={document.body.clientHeight}
    options={{ backgroundColor: 0x1d2230 }}
  >
    <NineSlicePlane
      width={document.body.clientWidth}
      height={document.body.clientHeight}
      x={0}
      y={0}
      image="./assets/campo.jpg"
    />
    <Container x={0} y={0}>
      <Soccer />
    </Container>
  </Stage>
);

export default App;
