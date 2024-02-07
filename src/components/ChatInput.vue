<template>
  <q-form @submit.prevent="queryAi">
    <q-input
      ref="refInput"
      type="textarea"
      class="chat-form"
      bg-color="white"
      input-style="max-height: 30vh;min-height:50px"
      outlined
      autofocus
      autogrow
      v-model="prompt"
      @keypress="handleKeypress"
      maxlength="1500"
    >
      <template v-slot:append>
        <q-btn
          :disable="disabled"
          color="secondary"
          padding="xs"
          dense
          flat
          icon="send"
          @click="queryAi"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
} from 'vue';
import { useQuasar } from 'quasar';

import useConversation from 'src/lib/useConversation.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'ChatInput',

  setup() {
    const $q = useQuasar();
    const refInput = ref();
    const prompt = ref('');
    const {
      connected,
      busy,
      sendMessage,
    } = useConversation();

    const disabled = computed(() => (!connected.value || busy.value));

    async function queryAi() {
      if (disabled.value) {
        return;
      }
      try {
        const text = prompt.value.trim();
        prompt.value = '';
        await sendMessage(text);
      } catch (err) {
        console.log(err);
        $q.notify({
          message: err.message,
          type: 'negative',
          position: 'top',
          actions: [
            {
              label: 'Dismiss',
              color: 'white',
            },
          ],
        });
      }
    }

    function handleKeypress(event) {
      const isEnter = (event.code === 'Enter' || event.code === 'NumpadEnter');
      if (isEnter && !(event.ctrlKey || event.shiftKey)) {
        event.preventDefault();
        queryAi();
      }
    }

    return {
      refInput,
      disabled,
      prompt,

      queryAi,
      handleKeypress,
    };
  },
});
</script>

<style lang="scss">
.chat-form {
  .q-field__append {
    align-self: flex-end;
  }
}
</style>
