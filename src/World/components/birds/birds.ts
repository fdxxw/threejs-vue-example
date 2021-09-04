import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupModel } from "./setupModel";

async function loadBirds() {
  const loader = new GLTFLoader();
  // animations 动画数组
  // assets 媒体数据
  // cameras 相机数组
  // parser GLTFLoader技术细节
  // scene 所有的网格
  // scenes 多个场景  这个特性很少被使用
  // userData  额外数据

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync("/assets/world/models/Parrot.glb"),
    loader.loadAsync("/assets/world/models/Flamingo.glb"),
    loader.loadAsync("/assets/world/models/Stork.glb"),
  ]);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);
  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5, 0, -10);
  const stork = setupModel(storkData);
  stork.position.set(0, -2.5, -10);
  return {
    parrot,
    flamingo,
    stork,
  };
}

export { loadBirds };
