<template>
  <q-item :class="`text-${color}`">
    <q-item-section avatar v-if="icon || image">
      <q-icon v-if="icon" :name="icon" />
      <q-avatar v-else-if="image">
        <img :src="image" >
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label v-if="overline" overline>{{overline}}</q-item-label>
      <q-item-label>{{label}}</q-item-label>
      <q-item-label v-if="caption" caption>{{caption}}</q-item-label>
    </q-item-section>
    <slot />
  </q-item>
</template>

<script>
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'MenuItem',

  props: {
    overline: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'dark',
    },
  },
});
</script>
