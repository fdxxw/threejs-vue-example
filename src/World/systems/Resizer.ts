import { PerspectiveCamera, WebGLRenderer } from "three";

class Resizer {
  container: HTMLElement;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  constructor(
    container: HTMLElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    this.container = container;
    this.camera = camera;
    this.renderer = renderer;
    this.setSize();
    window.addEventListener("resize", () => {
      this.setSize();
      this.onResize();
    });
  }
  setSize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    // 更新相机的椎体，投影矩阵
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  onResize() {}
}

export { Resizer };
