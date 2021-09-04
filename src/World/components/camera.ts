import { PerspectiveCamera } from "three";

function createCamera() {
  // 视野角度（FOV）, 长宽比（aspect ratio）, 近截面（near）, 远截面（far）
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  return camera;
}
export { createCamera };
