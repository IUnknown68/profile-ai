<template>
  <q-btn
    :loading="status.busy"
    :icon="noIcon ? undefined : status.icon"
    :label="noLabel ? undefined : status.label"
    :color="noColor ? undefined : status.color"
    @click="toggle"
  >
    <template v-slot:loading>
      <q-spinner-tail v-if="!noIcon" class="on-left" size="xs" />
      <span v-if="!noLabel">
        {{$t(status.label)}}
      </span>
    </template>
    <q-tooltip v-if="noLabel" :class="`bg-${status.color}`">
      {{$t(status.label)}}
    </q-tooltip>
  </q-btn>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import useA3Client from 'src/lib/useA3Client.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'A3ConnectButton',

  props: {
    noLabel: {
      type: Boolean,
      default: false,
    },

    noIcon: {
      type: Boolean,
      default: false,
    },

    noColor: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const { status, toggleConnect } = useA3Client();

    async function toggle() {
      try {
        await toggleConnect();
      } catch (err) {
        // Needs to be handled elsewhere.
        console.warn(err.message);
      }
    }

    return {
      status,
      toggle,
    };
  },
});
</script>
