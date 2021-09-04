import {
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Object3D,
} from "three";

class Loop {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private updatebles: Ticked[];
  private clock: Clock;
  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatebles = [];
    this.clock = new Clock();
  }
  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }
  stop() {
    this.renderer.setAnimationLoop(null);
  }
  tick() {
    const delta = this.clock.getDelta();
    for (const object of this.updatebles) {
      object.tick(delta);
    }
  }
  addTick(object: Ticked) {
    this.updatebles.push(object);
  }
  removeTick(object: Ticked) {
    let index = this.updatebles.findIndex((v) => v === object);
    if (index > -1) {
      this.updatebles.splice(index, 1);
    }
  }
}

interface Ticked {
  tick(delta: number): void;
}
export { Loop };
