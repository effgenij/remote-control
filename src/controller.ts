import sendPrintScreen from './controlls/send';
import mouse from './controlls/mouse';
import draw from './controlls/draw';

export default async function controller(command: string, x: string, y: string ) {
  const [base, specification] = command.split('_');
  let position;
  switch (base) {
    case 'mouse':
      position = await mouse(specification, x, y);
      if(specification === 'position') {
        return `mouse_position ${position.x},${position.y}\0`;
      }
      break;
    case 'draw':
      await draw(specification, x, y);
      break;
    case 'prnt':
      await sendPrintScreen();
      break;
    default:
      throw new Error('Wrong command received from client');
  }
}
