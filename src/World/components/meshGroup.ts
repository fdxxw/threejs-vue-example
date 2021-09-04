import { SphereBufferGeometry, MathUtils, MeshStandardMaterial, Mesh, Group } from "three";

function createMeshGroup() {
  // 组
  const group = new Group();

  // 球
  const geometry = new SphereBufferGeometry(0.25, 16, 16);
  const material = new MeshStandardMaterial({
    color: "indigo",
    flatShading: false,  // 平面着色
  });

  material.flatShading = true;
  // material.needsUpdate = true;  // 标记更新

  const protoSphere = new Mesh(geometry, material);
  const radiansPerSecond = MathUtils.degToRad(30);

  group.add(protoSphere);
  for (let i = 0; i < 1; i += 0.08) {
    const sphere = protoSphere.clone();
    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);
    // sphere.position.z = -i * 5;
    // 放大
    sphere.scale.multiplyScalar(0.05 + i);
    sphere.tick = (delta: number) => {
      sphere.rotation.x += radiansPerSecond * delta;
    }
    group.add(sphere);
  }
  group.scale.multiplyScalar(2);

  group.tick = (delta: number) => {
    // group.rotation.z -= radiansPerSecond * delta;
  };
  return group;
}

export { createMeshGroup };
