import {
  BoxBufferGeometry,
  MeshBasicMaterial,
  TextureLoader,
  MeshStandardMaterial,
  MathUtils,
  Mesh,
} from "three";
const radiansPerSecond = MathUtils.degToRad(30);
function createCube() {
  const geometry = new BoxBufferGeometry(2, 2, 2);
  // 最基础材质不会对光无效果，且所有的面都是单个颜色
  // 没有基于观察者角度/距离的阴影，所以对象看起来不像三维的
  // const material = new MeshBasicMaterial();
  
  const cube = new Mesh(geometry, createMaterial());
  // translation, rotation, scaling
  cube.rotation.set(-0.5, -0.1, 0.8);
  cube.tick = function (delta: number) {
    this.rotation.z += radiansPerSecond * delta;
    this.rotation.x += radiansPerSecond * delta;
    this.rotation.y += radiansPerSecond * delta;
  };
  return cube;
}

function createMaterial(): MeshStandardMaterial {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("/assets/world/textures/uv-test-col.png");
  const material = new MeshStandardMaterial({
    // color: "purple",
    map:texture,
  });
  return material;
}

export { createCube };
