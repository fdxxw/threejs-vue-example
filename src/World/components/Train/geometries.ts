import { BoxBufferGeometry, CylinderBufferGeometry } from "three";

function createGeometries() {
  // 火车舱体
  const cabin = new BoxBufferGeometry(2, 2.25, 1.5);
  // 火车鼻子
  const nose = new CylinderBufferGeometry(0.75, 0.75, 3, 12);
  // 轮子
  const wheel = new CylinderBufferGeometry(0.4, 0.4, 1.75, 16);
  // 烟筒
  const chimney = new CylinderBufferGeometry(0., 0.1, 0.5)

  return {
    cabin,
    nose,
    wheel,
    chimney
  }
}

export { createGeometries };
