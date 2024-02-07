import MainLayout from 'layouts/MainLayout.vue';

import IndexPage from 'pages/IndexPage.vue';
import AboutPage from 'pages/AboutPage.vue';
import PrivacyPage from 'pages/PrivacyPage.vue';
import TermsAndConditionsPage from 'pages/TermsAndConditionsPage.vue';
import ErrorNotFound from 'pages/ErrorNotFound.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/about',
        name: 'about',
        component: AboutPage,
      },
      {
        path: '/privacy',
        name: 'privacy',
        component: PrivacyPage,
      },
      {
        path: '/terms',
        name: 'terms-and-conditions',
        component: TermsAndConditionsPage,
      },
      {
        path: '',
        name: 'home',
        component: IndexPage,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
