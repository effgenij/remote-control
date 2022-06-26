import robot from 'robotjs';
import { ICoordinates } from './controlls.types';

export default async function draw(specification: string, x: string, y?: string): Promise<ICoordinates> {
  const position = robot.getMousePos();
  const drawFigure = {
    circle: async () => {
      await drawCircle(position, x);
    },
    rectangle: async () => {
      await drawRectangle(position, x, y);
    },
    square: async () => {
      await drawRectangle(position, x);
    },
  };
  drawFigure[specification as keyof typeof drawFigure];
  return robot.getMousePos();
}

async function drawCircle(position: ICoordinates, radius: string): Promise<void> {
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = position.x + Number(radius) * Math.cos(i);
    const y = position.y + Number(radius) * Math.sin(i);

    robot.dragMouse(x, y);
  }
}

async function drawRectangle(position: ICoordinates, width: string, optional_height?: string): Promise<void> {
  const height = optional_height ? optional_height : width;
  const { x, y } = position;

  robot.mouseToggle('down');
  robot.dragMouse(x + Number(width), y);
  robot.dragMouse(x + Number(width), y + Number(height));
  robot.dragMouse(x, y + Number(height));
  robot.dragMouse(x, y);
  robot.mouseToggle('up');
}
