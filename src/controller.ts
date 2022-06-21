import {
  sendMousePosition,
  upMouse,
  downMouse,
  rightMouse,
  leftMouse,
  drawCircle,
  drawSquare,
  drawRectangle,
  sendPrintScreen,
} from './controls';
import parseMessage from './utils';

export default function controller(message: string) {
  const [command, arg1, arg2] = parseMessage(message);
  switch (command) {
    case 'mouse_position':
      sendMousePosition();
      break;
    case 'mouse_up':
      upMouse(arg1);
      break;
    case 'mouse_down':
      downMouse(arg1);
      break;
    case 'mouse_right':
      rightMouse(arg1);
      break;
    case 'mouse_left':
      leftMouse(arg1);
      break;
    case 'draw_circle':
      drawCircle(arg1);
      break;
    case 'draw_square':
      drawSquare(arg1);
      break;
    case 'draw_rectangle':
      drawRectangle(arg1, arg2);
      break;
    case 'prnt_scrn':
      sendPrintScreen();
      break;
    default:
      throw new Error('Wrong command sended to server');
  }
}
