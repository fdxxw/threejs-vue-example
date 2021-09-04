import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

declare module "three/examples/jsm/controls/OrbitControls" {
  interface OrbitControls {
    tick(delta: number): void;
  }
}
