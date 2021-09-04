import {
  DirectionalLight,
  SpotLight,
  PointLight,
  AmbientLight,
  HemisphereLight,
} from "three";

function createLights() {
  // 创建一个平行光 (颜色,亮度)
  // 所有的灯光都有 (颜色,亮度)参数设置
  // position => target.position  (从某一点照向另一点))
  const mainLight = new DirectionalLight("white", 5);
  mainLight.position.set(10, 10, 10); // (10,10,10) => (0,0,0)
  // 环境光
  // const ambientLight = new AmbientLight("white", 2);
  // 半球光
  const ambientLight = new HemisphereLight("white", "darkslategrey", 5)

  return { mainLight, ambientLight };
}

export { createLights };
