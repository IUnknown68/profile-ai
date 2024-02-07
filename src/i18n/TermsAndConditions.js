import {
  computed,
} from 'vue';

import getI18n from 'src/i18n';

import TermsAndConditionsDe from 'src/i18n/de/TermsAndConditions.vue';
import TermsAndConditionsEn from 'src/i18n/en/TermsAndConditions.vue';

const components = {
  de: TermsAndConditionsDe,
  en: TermsAndConditionsEn,
};

//------------------------------------------------------------------------------
export default computed(
  () => (components[getI18n().global.locale.value] || components.en),
);
