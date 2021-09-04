import { defineComponent, ref, onMounted, Ref } from "vue";
import { Object3D, MathUtils, Vector3 } from "three";
const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;
import {
  InstancedMesh,
  Camera,
  BoxGeometry,
  StandardMaterial,
  PointLight,
  AmbientLight,
  Renderer,
  EffectComposer,
  Scene,
  RenderPass,
  UnrealBloomPass,
  HalftonePass,
} from "troisjs";

export default defineComponent({
  setup() {
    const imesh: Ref<any> = ref(null);
    const renderer: Ref<any> = ref(null);
    const light: Ref<any> = ref(null);
    const NUM_INSTANCES = 2000;
    const instances: any = [];
    const target = new Vector3();
    const dummyO = new Object3D();
    const dummyV = new Vector3();
    for (let i = 0; i < NUM_INSTANCES; i++) {
      instances.push({
        position: new Vector3(rndFS(200), rndFS(200), rndFS(200)),
        scale: rnd(0.2, 1),
        scaleZ: rnd(0.1, 1),
        velocity: new Vector3(rndFS(2), rndFS(2), rndFS(2)),
        attraction: 0.03 + rnd(-0.01, 0.01),
        vlimit: 1.2 + rnd(-0.1, 0.1),
      });
    }

    const init = () => {
      // init instanced mesh matrix
      for (let i = 0; i < NUM_INSTANCES; i++) {
        const { position, scale, scaleZ } = instances[i];
        dummyO.position.copy(position);
        dummyO.scale.set(scale, scale, scaleZ);
        dummyO.updateMatrix();
        imesh.value.mesh.setMatrixAt(i, dummyO.matrix);
      }
      imesh.value.mesh.instanceMatrix.needsUpdate = true;

      // animate
      renderer.value.onBeforeRender(animate);
    };
    const animate = () => {
      // console.log(renderer.value.three.pointer.positionV3)
      target.copy(renderer.value.three.pointer.positionV3);
      light.value.light.position.copy(target);

      for (let i = 0; i < NUM_INSTANCES; i++) {
        const { position, scale, scaleZ, velocity, attraction, vlimit } =
          instances[i];

        dummyV
          .copy(target)
          .sub(position)
          .normalize()
          .multiplyScalar(attraction);
        velocity.add(dummyV).clampScalar(-vlimit, vlimit);
        position.add(velocity);

        dummyO.position.copy(position);
        dummyO.scale.set(scale, scale, scaleZ);
        dummyO.lookAt(dummyV.copy(position).add(velocity));
        dummyO.updateMatrix();
        imesh.value.mesh.setMatrixAt(i, dummyO.matrix);
      }
      imesh.value.mesh.instanceMatrix.needsUpdate = true;
    };
    onMounted(async () => {
      init();
    });

    return () => (
      <>
        <Renderer
          ref={renderer}
          resize="window"
          auto-clear={false}
          mouse-move
          mouse-raycast
          orbit-ctrl
          pointer
        >
          <Camera position={{ z: 300 }}></Camera>
          <Scene>
            <AmbientLight color="#808080"></AmbientLight>
            <PointLight color="#ff6000"></PointLight>
            <PointLight
              color="#0060ff"
              intensity={0.5}
              ref={light}
            ></PointLight>
            <PointLight
              color="#ff6000"
              intensity={0.5}
              position={{ x: 100 }}
            ></PointLight>
            <PointLight
              color="#0000ff"
              intensity={0.5}
              position={{ x: -100 }}
            ></PointLight>

            <InstancedMesh ref={imesh} count={NUM_INSTANCES}>
              <BoxGeometry width={2} height={2} depth={10}></BoxGeometry>
              <StandardMaterial
                color="#ffffff"
                props={{opacity: 0.9, metalness: 0.8, roughness: 0.5}}
              ></StandardMaterial>
            </InstancedMesh>
          </Scene>
          <EffectComposer>
            <RenderPass></RenderPass>
            <UnrealBloomPass strength={1}></UnrealBloomPass>
            <HalftonePass radius={1} scatter={0}></HalftonePass>
          </EffectComposer>
        </Renderer>
      </>
    );
  },
});
