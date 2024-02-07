import { boot } from 'quasar/wrappers';
import { create } from 'src/i18n';

//------------------------------------------------------------------------------
export default boot(async ({ app }) => {
  const i18n = await create();
  app.use(i18n);
});
