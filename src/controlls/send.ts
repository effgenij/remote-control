import robot from 'robotjs';
import Jimp from 'jimp';

export default async function sendPrintScreen() {
  const dimenshion = 200;
  const halfDimenshion = dimenshion / 2;
  let { x, y } = robot.getMousePos();

  const screenShot = robot.screen.capture(x - halfDimenshion, y - halfDimenshion, dimenshion, dimenshion);
  const img = new Jimp({ data: screenShot.image, width: dimenshion, height: dimenshion });

  let pos = 0;
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, (_x, _y, idx) => {
    img.bitmap.data[idx + 0] = screenShot.image.readUInt8(pos++);
    img.bitmap.data[idx + 1] = screenShot.image.readUInt8(pos++);
    img.bitmap.data[idx + 2] = screenShot.image.readUInt8(pos++);
    img.bitmap.data[idx + 3] = screenShot.image.readUInt8(pos++);
  });

  const buffer = await img.getBufferAsync(Jimp.MIME_PNG);

  return `prnt_scrn ${buffer.toString('base64')}`;
}
