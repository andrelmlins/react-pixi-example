import React, { useState, useEffect } from "react";
import { Stage, Container, Graphics } from "@inlet/react-pixi";

const velocity = 10;

const collisionCircle = (ab, bb) =>
  Math.sqrt(Math.pow(bb.x - ab.x, 2) + Math.pow(bb.y - ab.y, 2)) <=
  ab.radius + bb.radius;

const collisionContainer = a =>
  a.y <= 500 - a.radius &&
  a.x <= 500 - a.radius &&
  a.x >= 0 + a.radius &&
  a.y >= 0 + a.radius;

const App = () => {
  const [position, setPosition] = useState({ x: 20, y: 20, radius: 20 });
  const [positionBall, setPositionBall] = useState({
    x: 300,
    y: 300,
    radius: 10
  });

  const [keys, setKeys] = useState({
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrorDown: false
  });

  useEffect(() => {
    window.addEventListener("keydown", e => {
      setKeys(keys => {
        let newKeys = { ...keys };
        newKeys[e.key] = true;
        return newKeys;
      });
    });
    window.addEventListener("keyup", e => {
      setKeys(keys => {
        let newKeys = { ...keys };
        newKeys[e.key] = false;
        return newKeys;
      });
    });
    return () => {
      window.removeEventListener("keydown", () => console.log("agora"));
      window.removeEventListener("keyup", () => console.log("agora1"));
    };
  }, []);

  useEffect(() => {
    let newPosition = { ...position };
    if (keys.ArrowUp) newPosition.y = newPosition.y - velocity;
    if (keys.ArrowDown) newPosition.y = newPosition.y + velocity;
    if (keys.ArrowRight) newPosition.x = newPosition.x + velocity;
    if (keys.ArrowLeft) newPosition.x = newPosition.x - velocity;

    if (collisionCircle(newPosition, positionBall)) {
      const newPositionBall = {
        ...positionBall,
        x: positionBall.x + newPosition.x - position.x,
        y: positionBall.y + newPosition.y - position.y
      };
      if (collisionContainer(newPositionBall)) {
        setPositionBall(newPositionBall);
      } else {
        setPositionBall({
          ...positionBall,
          x: positionBall.x - newPosition.x - position.x,
          y: positionBall.y - newPosition.y - position.y
        });
      }
    } else {
      if (collisionContainer(newPosition)) {
        setPosition(newPosition);
      }
    }
  }, [keys]);

  return (
    <Stage width={500} height={500} options={{ backgroundColor: 0x1d2230 }}>
      <Container x={0} y={0}>
        <Graphics
          draw={g => {
            g.clear();
            g.beginFill(0xff0000, 1);
            g.drawCircle(position.x, position.y, position.radius);
            g.endFill();
          }}
        />
        <Graphics
          draw={g => {
            g.clear();
            g.beginFill(0xffffff, 1);
            g.drawCircle(positionBall.x, positionBall.y, positionBall.radius);
            g.endFill();
          }}
        />
      </Container>
    </Stage>
  );
};

export default App;
