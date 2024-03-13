<template>
  <q-layout view="hHh Lpr lFf">
    <main-layout-header />
    <q-page-container>
      <router-view v-if="gdprConsent" />
      <q-page v-else>
        <main-layout-consent-dialog />
      </q-page>
    </q-page-container>
    <q-footer
      bordered
      class="bg-white flex column items-center q-px-md q-pt-lg q-pb-md"
    >
      <chat-input
        v-if="isChat"
        class="container-800"
      />
      <div class="flex justify-center items-center q-mt-md">
        <router-link :to="{name: 'terms-and-conditions'}">
          {{$t('terms-and-conditions.title')}}
        </router-link>
        <q-separator vertical class="q-mx-sm" />
        <router-link :to="{name: 'about'}">
          {{$t('about.title')}}
        </router-link>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import {
  defineComponent,
  onMounted,
  watch,
  computed,
} from 'vue';
import { useMeta } from 'quasar';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import moment from 'moment/min/moment-with-locales';

import {
  initConversation,
} from 'src/lib/useConversation.js';
import getI18n from 'src/i18n';

import ChatInput from 'components/ChatInput.vue';

import PrivacyStatement from 'src/i18n/PrivacyStatement.js';

import MainLayoutHeader from './MainLayoutHeader.vue';
import MainLayoutConsentDialog from './MainLayoutConsentDialog.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayout',

  components: {
    MainLayoutHeader,
    MainLayoutConsentDialog,
    ChatInput,
  },

  setup() {
    const gdprConsent = useStorage('gdprConsent', false);
    const lang = localStorage.getItem('lang', undefined);
    const { locale } = getI18n().global;
    const router = useRouter();

    const isChat = computed(() => (router.currentRoute.value?.name === 'home'));

    useMeta(() => ({
      title: `${getI18n().global.t(`${router.currentRoute.value.name}.title`)} - ${getI18n().global.t('app.name')}`,
    }));

    watch(locale, () => {
      if (locale.value) {
        localStorage.setItem('lang', locale.value);
        moment.locale(locale.value);
      }
    });

    onMounted(async () => {
      try {
        if (lang) {
          locale.value = lang;
          moment.locale(locale.value);
        }
        await initConversation();
      } catch (err) {
        console.warn(err.message);
      }
    });

    return {
      // eslint-disable-next-line no-undef
      version: PAI_VERSION,
      gdprConsent,
      isChat,
      PrivacyStatement,
    };
  },
});
</script>
