import {
  computed,
} from 'vue';

import getI18n from 'src/i18n';

import PrivacyStatementDe from 'src/i18n/de/PrivacyStatement.vue';
import PrivacyStatementEn from 'src/i18n/en/PrivacyStatement.vue';

const components = {
  de: PrivacyStatementDe,
  en: PrivacyStatementEn,
};

//------------------------------------------------------------------------------
export default computed(
  () => (components[getI18n().global.locale.value] || components.en),
);
