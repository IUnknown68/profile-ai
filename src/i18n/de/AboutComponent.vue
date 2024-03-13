<template>
  <div class="container-600 q-pa-md">
    <div class="text-h4 text-center q-mb-md">
      {{$t('about.title')}}
    </div>
    <p>
      <strong>"{{$t('app.name')}}"</strong> ist ein interaktives Profil
      meiner Person, das zu mir befragt werden und mir Nachrichten
      zukommen lassen kann.
    </p>
    <p><strong>Technik:</strong> Die App benutzt GPT-4 als Konversations-Agent
      mittels der
      <a href="https://platform.openai.com/docs/guides/text-generation" target="_blank">
        OpenAI-API</a>, eine Redis-Datenbank,
        <a href="https://docs.aleph-alpha.com/api/semantic-embed/" target="_blank">Luminous Semantic Embeddings</a>
        und <a href="https://platform.openai.com/docs/guides/function-calling" target="_blank">
        GPT function calling</a>, um document retrieval, mailing und weitere Tools
        einzubinden.
    </p>
    <p>
      Das <strong>Frontend</strong> wurde mit <a href="https://quasar.dev/docs" target="_blank">
      Quasar</a> und <a href="https://vuejs.org/" target="_blank">Vue.js</a> erstellt,
      das Backend ist ein nodejs-server.
    </p>
    <p>
      Die Redis-Datenbank speichert <strong>Text-Embeddings</strong>, die mit dem
      <a href="https://docs.aleph-alpha.com/docs/introduction/model-card/" target="_blank">Luminous-Modell</a>
      erstellt wurden und Informationen über mich enthalten, wie die Projektliste,
      Lebenslauf und meine Meinung zu verschiedenen Themen.
    </p>
    <p>
      <strong>Unterhaltungen</strong> werden ebenfalls in der Redis-Datenbank gespeichert und können
      mit Kenntnis der ID wieder abgerufen werden. Die ID der aktuellen Unterhaltung
      wird im Session-Store des Browsers gespeichert.
    </p>
    <p>
      <strong>Sprachunterstützung:</strong> Das UI ist localized, es sind Deutsch und Englisch
      verfügbar. Die Sprachauswahl wird automatisch getroffen und dynamisch angepasst,
      basierend auf der Sprache des Benutzers beim Chat, oder der Sprache,
      die er explizit anfordert. Das UI wurde mit GPT-4 von Deutsch in Englisch
      übersetzt, weitere Sprachen sind möglich und können automatisch erzeugt
      werden.
    </p>
    <div class="text-h5 text-center q-mb-md">
      Stand
    </div>
    <p>
      Die Anwendung ist ein MVP im "Make it work"-Zustand. Sie ist teilweise
      zusammengebaut aus Schnipseln, die ich für andere Projekte verwende,
      und die selber im Fluss sind.
    </p>
    <p>
      Der nächste Schritt wäre also "Make it right" - Code reviews, refactoring,
      Todo-Listen abarbeiten, Code in packages auslagern, automatisches deployment
      usw... Sie kennen das.
    </p>
    <p>
      <strong>Versionsstand:</strong> {{version}}
    </p>
    <p class="text-italic">
      Dieser Text wurde von mir auf Deutsch geschrieben und von GPT übersetzt.
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
