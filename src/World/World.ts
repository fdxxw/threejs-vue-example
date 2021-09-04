import { PerspectiveCamera, WebGLRenderer, Scene } from "three";
import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createMeshGroup } from "./components/meshGroup";
import { Train } from "./components/Train/Train";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/renderer";
import { createControls } from "./systems/controls";
import { Resizer } from "./systems/Resizer";
import { createLights } from "./components/light";
import { Loop, } from "./systems/Loop";
import { loadBirds } from "./components/birds/birds";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;

  // 1. 创建app
  constructor(container: HTMLElement) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.appendChild(this.renderer.domElement);

    // 添加一个方块
    // const cube = createCube();
    // const meshGroup = createMeshGroup();
    const train = new Train();
    const { mainLight, ambientLight } = createLights();
    this.controls = createControls(this.camera, this.renderer.domElement);
    // controls.target = cube.position;
    this.loop.addTick(this.controls);
    this.loop.addTick(train);
    this.scene.add(train, mainLight, ambientLight);

    // resize
    const resizer = new Resizer(container, this.camera, this.renderer);
  }
  async init() {
    const { parrot, flamingo, stork } = await loadBirds();
    this.controls.target.copy(parrot.position);
    this.loop.addTick(parrot)
    this.loop.addTick(flamingo)
    this.loop.addTick(stork)
    this.scene.add(parrot, flamingo, stork);
  }
  // 2. 渲染场景
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}

export { World };
