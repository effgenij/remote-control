import robot from 'robotjs';
import { ICoordinates } from './mouse.types';

export default function mouse(specification: string, x: string, y: string): ICoordinates {
  const position = robot.getMousePos();
  const changeMousePosition = {
    'up': () => {
      robot.moveMouseSmooth(position.x, position.y - Number(y));
    },
    'down': () => {
      robot.moveMouseSmooth(position.x, position.y + Number(y));
    },
    'left': () => {
      robot.moveMouseSmooth(position.x - Number(x), position.y);
    },
    'right': () => {
      robot.moveMouseSmooth(position.x + Number(x), position.y);
    }
  };
  if(specification !== 'position') changeMousePosition[specification as keyof typeof changeMousePosition];
  return robot.getMousePos();
}
  