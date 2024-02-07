<template>
  <div>
    <div class="text-h6 q-my-md">
      Nutzung
    </div>
    <p>
      Diese Website ist nur nach Anmeldung verfügbar. <strong>Sollten Sie ohne ausdrückliche
      Einladung von mir hier sein, verlassen Sie diese Seite jetzt!</strong>
    </p>
    <p>
      Die Nutzung erfolgt auf eigene Gefahr.
    </p>

    <div class="text-h6 q-my-md">
      Cookies
    </div>
    <p>
      Bei der Anmeldung wird ein <strong>Session-Cookie</strong> gesetzt.
    </p>

    <div class="text-h6 q-mb-md">
      Externe Dienste
    </div>
    <p>
      Auf dieser Website interagieren Sie mit den KIs von
      <a href="https://openai.com/" target="_blank">OpenAI</a>
      und
      <a href="https://aleph-alpha.com/" target="_blank">Aleph-Alpha</a>.
      Dabei werden Ihre Eingaben von Sprachmodellen dieser Unternehmen verarbeitet.
      <strong>Überlegen Sie sich genau, welche persönlichen Daten sie im Chat preisgeben!</strong>
    </p>
    <p>
      Lesen Sie die <a href="https://openai.com/policies/privacy-policy" target="_blank">Datenschutzerklärung von OpenAI</a>
      und von
      <a href="https://aleph-alpha.com/de/datenschutz" target="_blank">Datenschutzerklärung von Aleph Alpha</a>.
    </p>
    <div v-if="!isTerms" class="flex items-center no-wrap">
      <div class="text-bold q-pr-sm">
        Ich stimme der Nutzung von OpenAI und Aleph-Alpha zu.
      </div>
      <q-space />
      <q-toggle
        v-model="agreeExternals"
      />
    </div>

    <div class="text-h6 q-my-md">
      Diese Website
    </div>
    <p>
      Die <strong>Unterhaltungen</strong>, die Sie mit der KI auf dieser Website führen,
      werden in einer Datenbank auf meinem Server <strong>gespeichert</strong>.
      Über die E-Mailadresse, mit der Sie hier angemeldet sind, kann ich diese Ihnen
      zuordnen.
    </p>
    <p>
      Ich benutze diese Daten lediglich um daraus zu lernen, wie ich diese Anwendung
      verbessern kann, und um Fehler oder entgangene Kontaktaufnahmen zu entdecken.
      Zu keiner Zeit teile ich die Daten mit Dritten. <strong>Ausnahmen: Siehe oben
      unter "Externe Dienste"</strong>. Ihre E-Mailadresse teile ich <strong>nicht</strong>
      mit Drittanbietern.
    </p>
    <div v-if="!isTerms" class="flex items-center no-wrap">
      <div class="text-bold q-pr-sm">
        Ich stimme der Speicherung meiner Unterhaltungen zu.
      </div>
      <q-space />
      <q-toggle
        v-model="agreeSaveConversation"
      />
    </div>

    <div v-if="isTerms" class="q-pt-sm">
      <p>
        Sie können jederzeit <strong>Auskunft</strong> über diese Daten
        anfordern oder die <strong>Löschung</strong> verlangen.
      </p>
      <div class="flex justify-end no-wrap gap-md">
        <q-btn
          label="Datenauskunft anfordern"
          color="secondary"
          unelevated
          no-caps
          no-wrap
          href="mailto:profileadmin@arneseib.com?subject=Anforderung Datenauskunft"
        />
        <q-btn
          label="Löschung anfordern"
          color="secondary"
          unelevated
          no-caps
          no-wrap
          href="mailto:profileadmin@arneseib.com?subject=Anforderung zur Löschung von Daten"
        />
      </div>
    </div>

    <div v-if="isTerms">
      <q-separator class="q-my-md" />
      <div class="text-h6 q-mb-md" >
        Verantwortlich
      </div>
      <p>für diese Website ist:</p>
      <p>
        Arne Seib<br>
        Benzstrasse 4<br>
        64646 Heppenheim<br>
        <br>
        E-Mail: <a href="mailto:profileadmin@arneseib.com">profileadmin@arneseib.com</a>
      </p>
      <p class="text-italic">Stand: 23.1.2024</p>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PrivacyStatement',

  props: {
    isTerms: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const agreeExternals = ref(false);
    const agreeSaveConversation = ref(false);

    function updateModel() {
      emit('update:modelValue', (agreeExternals.value && agreeSaveConversation.value));
    }

    watch(agreeExternals, updateModel);
    watch(agreeSaveConversation, updateModel);

    return {
      agreeExternals,
      agreeSaveConversation,
    };
  },
});
</script>
