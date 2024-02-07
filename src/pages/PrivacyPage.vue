<template>
  <q-page class="flex justify-center q-pa-md">
    <q-card
      flat
      bordered
      class="container-800"
    >
      <q-card-section>
        <div class="text-h5 text-primary">
          {{$t('privacyStatement.headline')}}
        </div>
      </q-card-section>
      <q-card-section>
        <component :is="PrivacyStatement" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import PrivacyStatement from 'src/i18n/PrivacyStatement.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PrivacyPage',

  setup() {
    return {
      PrivacyStatement,
    };
  },
});
</script>
