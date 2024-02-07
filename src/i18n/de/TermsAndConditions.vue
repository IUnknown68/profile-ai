<template>
  <q-page class="flex justify-center content-start q-py-md">
    <div class="container-600 q-pa-md">
      <div class="text-h4 text-center q-mb-md">
        {{$t('terms-and-conditions.title')}}
      </div>
      <PrivacyStatement is-terms />
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import PrivacyStatement from './PrivacyStatement.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'TermsAndConditionsPage',

  components: {
    PrivacyStatement,
  },
});
</script>
