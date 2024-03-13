<template>
  <q-page
    ref="elementRef"
    class="flex justify-center q-pa-md"
    :class="{'items-center': !connected}"
  >
    <q-card
      v-if="connected"
      class="container-800"
      flat
      bordered
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar
            size="80px"
            rounded
          >
            <img
              src="/avatar.png"
              :style="avatarStyle"
            >
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label overline>
            {{$t('conversation.overline')}}
          </q-item-label>
          <q-item-label class="text-h4">
            {{$t('ai-assistant.name')}}
          </q-item-label>
          <q-item-label>
            {{$t('ai-assistant.welcome-message')}}
          </q-item-label>
        </q-item-section>
        <q-item-section side class="flex justify-end q-px-md">
          <q-btn
            small
            padding="xs"
            flat
            color="primary"
            title="Conversation"
            icon="forum"
          >
            <q-menu
              anchor="bottom right"
              self="top right"
              ref="menu"
              auto-close
            >
              <q-list style="min-width: 120px">
                <MenuItem
                  clickable
                  @click="clearConversation"
                  icon="restart_alt"
                  :label="$t('conversation.new')"
                />
                <MenuItem
                  clickable
                  @click="undoClearConversation"
                  icon="undo"
                  :disable="!canUndo"
                  :label="$t('conversation.new.undo')"
                />
                <MenuItem
                  clickable
                  @click="downloadConversation"
                  icon="download"
                  :disable="conversation.length === 0"
                  :label="$t('conversation.download')"
                />
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>

      <q-separator inset />

      <q-card-section>
        <MessageEntry
          v-for="(message, index) of conversation"
          :key="index"
          :message="message"
        />
      </q-card-section>
    </q-card>

    <q-spinner
      v-if="busy"
      color="primary"
      size="3em"
      :thickness="2"
    />

    <q-banner
      v-if="closed"
      class="text-white bg-red"
    >
      {{$t('connection.state.disconnected')}}
      <template v-slot:action>
        <q-btn
          flat
          color="white"
          :label="$t('connection.action.connect')"
          @click="handleOpen"
        />
      </template>
    </q-banner>
    <q-page-sticky
      v-if="connected"
      position="top-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="south"
        color="accent"
        @click="gotoBottom"
        v-show="!atBottom"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  watch,
} from 'vue';
import {
  ConnectionState,
} from '@seiberspace/any-conn-shared';

import useA3Client from 'src/lib/useA3Client.js';
import useConversation from 'src/lib/useConversation.js';
import useAutoScroll from 'src/lib/useAutoScroll';
import getI18n from 'src/i18n';

import MessageEntry from 'components/MessageEntry.vue';
import MenuItem from 'components/MenuItem.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'IndexPage',

  components: {
    MessageEntry,
    MenuItem,
  },

  setup() {
    // TODO: Clean this up.
    const {
      elementRef,
      atBottom,
      update,
      gotoBottom,
    } = useAutoScroll();

    const {
      connected,
      conversation,
      canUndo,
      clearConversation,
      undoClearConversation,
      downloadConversation,
    } = useConversation();

    const {
      state,
      open,
      subscribeEvent,
    } = useA3Client();

    const busy = computed(
      () => ((state.value === ConnectionState.Opening) || (state.value === ConnectionState.Closing)),
    );
    const closed = computed(() => (state.value === ConnectionState.Closed));

    const hue = ref(80);
    const saturation = ref(0.9);
    const avatarStyle = computed(() => ({
      filter: `hue-rotate(${hue.value}deg) saturate(${saturation.value})`,
      transition: 'filter 0.3s ease-out',
    }));

    async function handleOpen() {
      try {
        await open();
      } catch (err) {
        console.warn(err.message);
      }
    }

    watch(conversation, update, { flush: 'post' });

    subscribeEvent('ui.setlang', (lang) => {
      getI18n().global.locale.value = lang;
    });

    subscribeEvent('ui.setcolor', (newValue) => {
      hue.value = newValue;
      saturation.value = 1.0;
    });

    return {
      conversation,
      connected,
      busy,
      canUndo,
      closed,
      elementRef,
      atBottom,
      avatarStyle,

      gotoBottom,
      clearConversation,
      undoClearConversation,
      downloadConversation,
      handleOpen,
    };
  },
});
</script>
