import { defineComponent, onMounted, ref, Ref } from "vue";
import { World } from "../../World/World";
import "./style.scss";

export default defineComponent({
  setup() {
    const canvas: Ref<HTMLElement | null> = ref(null);
    let app: World;
    onMounted(async () => {
      app = new World(canvas.value as HTMLElement);
      try {
        await app.init();
      } catch (error) {}
      app.start();
    });
    return () => (
      <>
        <div ref={canvas}></div>
      </>
    );
  },
});
