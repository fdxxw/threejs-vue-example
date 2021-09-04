import { Object3D } from "three";

declare module "three" {
  interface Object3D {
    tick(delta: number): void;
  }
}
