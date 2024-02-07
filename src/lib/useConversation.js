import {
  ref,
  reactive,
  computed,
  watch,
} from 'vue';
import { exportFile } from 'quasar';

import getI18n from 'src/i18n';
import useA3Client from 'src/lib/useA3Client.js';

export default useConversation;

const client = useA3Client();
const apiLoaded = ref(false);

const conversation = reactive([]);
const conversationIdUndo = ref(null);
const connected = computed(() => (client.status.value.connected && apiLoaded.value));
const canUndo = computed(() => !!conversationIdUndo.value);
const busy = ref(false);

// TODO: use useStorage()
const STORAGE_KEY = 'conversation';
let conversationId = null;

//------------------------------------------------------------------------------
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//------------------------------------------------------------------------------
function useConversation() {
  return {
    conversation,
    connected,
    busy,
    canUndo,
    sendMessage,
    clearConversation,
    undoClearConversation,
    downloadConversation,
  };
}

//------------------------------------------------------------------------------
export async function initConversation() {
  if (client.status.value?.connected) {
    console.log('Already connected.');
    await initialized();
    return useConversation();
  }

  const clientUrl = new URL('/api', window.location);
  clientUrl.protocol = 'wss:';
  client.setup(clientUrl.href);

  watch(client.status, async (newValue) => {
    if (!newValue.connected) {
      apiLoaded.value = false;
    } else {
      await initialized();
    }
  });

  await client.open();
  return useConversation();
}

//------------------------------------------------------------------------------
async function sendMessage(text) {
  pushMessage(text);
  const response = pushResponse();
  try {
    busy.value = true;
    if (!conversationId) {
      conversationId = await client.api.rpc.assistant.createConversation();
      storeConversation();
    }
    const lang = getI18n().global.locale.value;
    const updates = await client.api.rpc.assistant.query(conversationId, text, lang);

    for await (const update of updates) {
      switch (update.type) {
        case 'status':
          switch (update.status) {
            case 'finished':
              delete response.busy;
              break;
            default:
              break;
          }
          break;
        case 'update':
          response.message.content += update.delta;
          break;
        case 'error': {
          const err = new Error(update.error.message);
          err.name = update.error.name;
          throw err;
          break;
        }
        default:
          console.warn('Unhandled message:', update);
          break;
      }
    }
  } catch (err) {
    console.error(err);
    // Error will be displayed in chat message:
    response.error = err;
  } finally {
    busy.value = false;
  }
}

//------------------------------------------------------------------------------
function pushMessage(content) {
  const message = reactive({
    ts: new Date(),
    message: {
      role: 'user',
      content,
    },
  });
  conversation.push(message);
  return message;
}

//------------------------------------------------------------------------------
function pushResponse() {
  const message = reactive({
    busy: true,
    ts: new Date(),
    message: {
      role: 'assistant',
      content: '',
    },
  });
  conversation.push(message);
  return message;
}

//------------------------------------------------------------------------------
async function initialized() {
  if (apiLoaded.value) {
    return;
  }
  // A bit of a hack: AnyConn does not yet support this by itself.
  while (!client.api?.rpc?.assistant) {
    await delay(100);
  }
  await loadConversation(sessionStorage.getItem(STORAGE_KEY));
  apiLoaded.value = true;
}

//------------------------------------------------------------------------------
function clearConversation() {
  conversationIdUndo.value = conversationId;

  conversation.splice(0, conversation.length);
  conversationId = null;

  storeConversation();
}

//------------------------------------------------------------------------------
async function undoClearConversation() {
  if (conversationIdUndo.value) {
    await loadConversation(conversationIdUndo.value);
    conversationIdUndo.value = null;
  }
  storeConversation();
}

//------------------------------------------------------------------------------
function downloadConversation() {
  const downloadData = conversation.map((message) => {
    const role = (message.message.role === 'assistant')
      ? getI18n().global.t('ai-assistant.name')
      : getI18n().global.t('username');
    return `${role}:\n${message.message.content.trim()}\n\n`;
  }).join('');
  exportFile('conversation.md', downloadData);
}

//------------------------------------------------------------------------------
function storeConversation() {
  if (conversationId) {
    sessionStorage.setItem(STORAGE_KEY, conversationId);
  } else {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}

//------------------------------------------------------------------------------
async function loadConversation(id) {
  if (!id) {
    return;
  }
  const conversation = (await client.api.rpc.assistant.loadConversation(id))
    .map((entry) => ({
      ...entry,
      ts: new Date(entry.ts),
    }));
  if (conversation.length) {
    conversationId = id;
    conversation.splice(0, conversation.length, ...conversation);
  }
}

