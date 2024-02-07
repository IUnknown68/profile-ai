<template>
  <q-page class="flex justify-center content-start q-py-md">
    <component :is="TermsAndConditions" />
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import TermsAndConditions from 'src/i18n/TermsAndConditions.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'TermsAndConditionsPage',

  setup() {
    return {
      TermsAndConditions,
    };
  },
});
</script>
