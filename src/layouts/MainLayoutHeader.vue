<template>
  <q-header>
    <q-toolbar>
      <q-toolbar-title
        class="flex column justify-center"
        style="line-height: 1em;min-width: 30px"
        shrink
      >
        <div class="max-full ellipsis">
          {{$t('app.name')}}
        </div>
        <div class="text-caption max-full ellipsis">
          {{$t('app.version')}} {{version}}
        </div>
      </q-toolbar-title>
      <q-tabs
        inline-label
        mobile-arrows
        no-caps
        class="q-ml-sm q-mr-xs max-full"
      >
        <q-route-tab
          :to="{name:'home'}"
          exact
          name="home"
          icon="chat"
          :label="showLabels ? $t('home.title') : undefined"
          class="text-white"
        />
        <q-route-tab
          :to="{name:'about'}"
          exact
          name="about"
          icon="help"
          :label="showLabels ? $t('about.title') : undefined"
          class="text-white"
        />
        <q-route-tab
          :to="{name:'terms-and-conditions'}"
          exact
          name="terms"
          icon="policy"
          :label="showLabels ? $t('terms-and-conditions.title') : undefined"
          class="text-white"
        />
      </q-tabs>
      <q-space />
      <a3-connect-button
        flat
        dense
        round
        no-label
        no-color
        v-if="gdprConsent"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import { useQuasar } from 'quasar';
import { useStorage } from '@vueuse/core';

import A3ConnectButton from 'components/A3ConnectButton.vue';

//----------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayoutHeader',

  components: {
    A3ConnectButton,
  },

  setup() {
    const gdprConsent = useStorage('gdprConsent', false);
    const quasar = useQuasar();
    const showLabels = computed(() => quasar.screen.gt.xs);
    return {
      // eslint-disable-next-line no-undef
      version: PAI_VERSION,
      showLabels,
      gdprConsent,
    };
  },
});
</script>
