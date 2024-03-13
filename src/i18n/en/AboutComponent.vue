<template>
  <div class="container-600 q-pa-md">
    <div class="text-h4 text-center q-mb-md">
      {{$t('about.title')}}
    </div>
    <p>
      <strong>"{{$t('app.name')}}"</strong> is an interactive profile
      about me, where you can ask questions and send messages.
    </p>
    <p><strong>Technology:</strong> The app utilizes GPT-4 as a conversational agent
      through the
      <a href="https://platform.openai.com/docs/guides/text-generation" target="_blank">
        OpenAI API</a>, a Redis database,
        <a href="https://docs.aleph-alpha.com/api/semantic-embed/" target="_blank">Luminous Semantic Embeddings</a>,
        and <a href="https://platform.openai.com/docs/guides/function-calling" target="_blank">
        GPT function calling</a>, to incorporate document retrieval, mailing, and other tools.
    </p>
    <p>
      The <strong>frontend</strong> was built using <a href="https://quasar.dev/docs" target="_blank">
      Quasar</a> and <a href="https://vuejs.org/" target="_blank">Vue.js</a>,
      while the backend is a node.js server.
    </p>
    <p>
      The Redis database stores <strong>text embeddings</strong> created with the
      <a href="https://docs.aleph-alpha.com/docs/introduction/model-card/" target="_blank">Luminous model</a>,
      containing information about me, such as the project list, resume, and my opinions on various topics.
    </p>
    <p>
      <strong>Conversations</strong> are also stored in the Redis database and can be
      retrieved with knowledge of the ID. The ID of the current conversation
      is stored in the browser's session store.
    </p>
    <p>
      <strong>Language Support:</strong> The UI is localized, with German and English
      available. The language selection is automatically determined and dynamically adjusted
      based on the user's language during the chat or the language explicitly requested.
      The UI was translated from German to English using GPT-4, and additional languages
      are possible and can be generated automatically.
    </p>
    <div class="text-h5 text-center q-mb-md">
      Status
    </div>
    <p>
      The application is an MVP in the "Make it work" state. It is partially
      assembled from snippets I use for other projects, which are also in flux.
    </p>
    <p>
      The next step would be "Make it right" - code reviews, refactoring,
      addressing to-do lists, outsourcing code into packages, automatic deployment,
      etc... You know the drill.
    </p>
    <p>
      <strong>Version:</strong> {{version}}
    </p>
    <p class="text-italic">
      This text was written by me in German and translated by GPT.
    </p>
  </div>
</template>


<script>
import {
  defineComponent,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AboutComponent',

  setup() {
    return {
      // eslint-disable-next-line no-undef
      version: PAI_VERSION,
    };
  },
});
</script>
