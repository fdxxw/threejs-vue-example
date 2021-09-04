import { defineComponent } from "vue";
import T1 from "./examples/t1";
import World from "./examples/World/World";
export default defineComponent({
  setup() {
    return () => (
      <>
        {/* <T1></T1> */}
        <World></World>
      </>
    )
  },
});
