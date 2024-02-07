<template>
  <q-dialog
    persistent
    :modelValue="true"
  >
    <q-card class="container-600 max-full">
      <q-card-section>
        <div class="text-h5 text-primary">
          {{$t('privacyStatement.headline')}}
        </div>
        <component :is="PrivacyStatement" v-model="consentGiven" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="secondary"
          outline
          padding="sm xl"
          :label="$t('privacyStatement.button.accept')"
          :disabled="!consentGiven"
          @click="consentToGdpr"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  defineComponent,
  ref,
} from 'vue';
import { useStorage } from '@vueuse/core';

import PrivacyStatement from 'src/i18n/PrivacyStatement.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayoutConsentDialog',

  setup() {
    const gdprConsent = useStorage('gdprConsent', false);
    const consentGiven = ref(false);

    function consentToGdpr() {
      gdprConsent.value = true;
    }

    return {
      PrivacyStatement,
      gdprConsent,
      consentGiven,

      consentToGdpr,
    };
  },
});
</script>
