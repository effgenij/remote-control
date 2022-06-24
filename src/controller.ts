import { sendPrintScreen } from './controlls/send';
import mouse from './controlls/mouse';
import draw from './controlls/draw';

export default async function controller(data: string) {
  const [command, x, y] = data.split(' ');
  const [base, specification] = command.split('_');
  let position;
  switch (base) {
    case 'mouse':
      position = await mouse(specification, x, y);
      return `mouse_position ${position.x},${position.y}\0`;
    case 'draw':
      position = await draw(specification, x, y);
      return `mouse_position ${position.x},${position.y}\0`;
    case 'prnt':
      sendPrintScreen();
      break;
    default:
      throw new Error('Wrong command received from client');
  }
}
