import {
  computed,
} from 'vue';

import getI18n from 'src/i18n';

import AboutComponentDe from 'src/i18n/de/AboutComponent.vue';
import AboutComponentEn from 'src/i18n/en/AboutComponent.vue';

const components = {
  de: AboutComponentDe,
  en: AboutComponentEn,
};

//------------------------------------------------------------------------------
export default computed(
  () => (components[getI18n().global.locale.value] || components.en),
);
