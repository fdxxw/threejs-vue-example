import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function createControls(camera: Camera, canvas: HTMLElement) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.tick = () => controls.update();
  return controls;
}

export { createControls };
