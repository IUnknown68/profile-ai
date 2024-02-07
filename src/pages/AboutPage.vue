<template>
  <q-page class="flex justify-center content-start q-py-md">
    <component :is="AboutComponent" />
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import AboutComponent from 'src/i18n/AboutComponent.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AboutPage',

  setup() {
    return {
      AboutComponent,
    };
  },
});
</script>
