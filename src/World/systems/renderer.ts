import { WebGLRenderer } from "three";
function createRenderer() {
  const renderer = new WebGLRenderer({antialias: true});
  // 开启正式物理光
  renderer.physicallyCorrectLights = true;
  return renderer;
}

export { createRenderer };
