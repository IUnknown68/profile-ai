import {
  ref,
  computed,
} from 'vue';

const tickCount = ref(0);

setInterval(() => {
  ++tickCount.value;
}, 1000);

//------------------------------------------------------------------------------
function useTicks(interval = 1) {
  const ticks = computed(() => Math.floor(tickCount.value / interval));

  return {
    ticks,
  };
}

export default useTicks;
