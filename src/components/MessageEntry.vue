<template>
  <q-chat-message
    class="text-body1 text-dense"
    :bg-color="bgColor"
    :name="isUser ? $t('username') : $t('ai-assistant.name')"
    :text-color="textColor"
    :stamp="timeStamp"
    :sent="isUser"
  >
    <div v-if="!!message.error">
      <q-icon name="warning" size="md" />
      {{message.error.message}}
    </div>
    <div v-else>
      <div
        class="html-msg"
        :class="{sent: isUser}"
        v-html="sanitized"
      />
      <q-spinner-dots v-if="message.busy" size="2rem" />
    </div>
  </q-chat-message>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import moment from 'moment/min/moment-with-locales';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

import useTicks from 'src/lib/useTicks';

const UPDATE_TIMESTAMPS_INTERVAL = 10;

//------------------------------------------------------------------------------
function sanitizeReply(replyHtml) {
  return sanitizeHtml(replyHtml, {
    allowedTags: [
      'b', 'p', 'i', 'u', 'li', 'ul', 'ol', 'strong',
    ],
    allowedAttributes: {},
  });
}

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
});

md.linkify.set({ target: '_blank' });

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MessageEntry',

  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { ticks } = useTicks(UPDATE_TIMESTAMPS_INTERVAL);

    const isUser = computed(() => props.message.message.role === 'user');
    const bgColor = computed(() => {
      if (isUser.value) {
        return 'blue-1';
      }
      return props.message.error ? 'red' : 'grey-3';
    });
    const sanitized = computed(() => ((isUser.value)
      ? sanitizeReply(props.message.message.content)
      : md.render(sanitizeReply(props.message.message.content))));
    const timeStamp = computed(() => {
      ticks.value;
      return (moment(props.message.ts).fromNow());
    });
    const textColor = computed(() => (props.message.error ? 'white' : 'black'));

    return {
      bgColor,
      textColor,
      timeStamp,
      isUser,
      sanitized,
    };
  },
});
</script>

<style lang="scss" scoped>
.html-msg.sent {
  white-space: pre-wrap;
}
</style>
