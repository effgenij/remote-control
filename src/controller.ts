import { sendMousePosition, sendPrintScreen } from './controlls/send';
import { upMouse, downMouse, rightMouse, leftMouse } from './controlls/move';
import { drawCircle, drawSquare, drawRectangle } from './controlls/draw';

export default function controller(data: string) {
  const [command, x, y] = data.split(' ');
  switch (command) {
    case 'mouse_position':
      sendMousePosition();
      break;
    case 'mouse_up':
      upMouse(x);
      break;
    case 'mouse_down':
      downMouse(x);
      break;
    case 'mouse_right':
      rightMouse(x);
      break;
    case 'mouse_left':
      leftMouse(x);
      break;
    case 'draw_circle':
      drawCircle(x);
      break;
    case 'draw_square':
      drawSquare(x);
      break;
    case 'draw_rectangle':
      drawRectangle(x, y);
      break;
    case 'prnt_scrn':
      sendPrintScreen();
      break;
    default:
      throw new Error('Wrong command received from client');
  }
}
