import robot from 'robotjs';

export async function sendMousePosition() {
    let mouse = robot.getMousePos();
    console.log(mouse);
  }
  
  
export function sendPrintScreen() {
    return;
  }