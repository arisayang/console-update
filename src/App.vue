<template>
  <div id="app">
    Hi!
    <router-link to="/contact-us">
      Go to contact-us
    </router-link>

    <!-- test awesome-phonenumber -->
    <div class="" @click="parsedCell('0912312345')">
      test parsePhoneNumber
    </div>

    <!-- Tiptap -->
    <div
      class="rounded-xl grey px-6 py-2"
      :class="{
        'text--white': $vuetify.theme.dark,
        'file-input--darken': $vuetify.theme.dark,
        'lighten-3': !$vuetify.theme.dark,
      }"
    >
      <div class="text-caption text--secondary">
        內容介紹
      </div>
      <Tiptap
        ref="editor"
        v-model="html"
        upload-image-route="/uploadImage/ecProduct"
      />
    </div>

    <!-- BarChart -->
    <v-card-text>
      <BarChart :data="salesDataByChannel" :options="salesDataByChannelOptions" :height="250" />
    </v-card-text>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { ref, onMounted } from 'vue';
import { parsePhoneNumber } from 'awesome-phonenumber';
import Axios from '@/helpers/axios';
import BarChart from '@/components/BarChart.vue';
import Tiptap from '@/components/Tiptap.vue';

const html = ref(null);

const salesDataByChannel = ref();
const salesDataByChannelOptions = ref({
  scales: {
    y: {
      beginAtZero: true, // y 軸從 0 開始
      grid: {
        drawBorder: false, // y 軸初始軸不畫
      },
      ticks: {
        callback(value) { // y 軸 label 格式
          const prefix = '$';
          const suffix = '';

          if (value < 1000) {
            return `${prefix}${value.toLocaleString()}`;
          } if (value >= 1000 && value < 10000) {
            return `${prefix}${(value / 1000).toFixed(1).replace('.0', '')} 千${suffix}`;
          } if (value >= 10000 && value < 100000) {
            return `${prefix}${(value / 10000).toFixed(1).replace('.0', '')} 萬${suffix}`;
          } if (value >= 100000 && value < 1000000) {
            return `${prefix}${(value / 100000).toFixed(1).replace('.0', '')} 十萬${suffix}`;
          } if (value >= 1000000 && value < 10000000) {
            return `${prefix}${(value / 1000000).toFixed(1).replace('.0', '')} 百萬${suffix}`;
          } if (value >= 10000000 && value < 100000000) {
            return `${prefix}${(value / 10000000).toFixed(1).replace('.0', '')} 千萬${suffix}`;
          } if (value >= 100000000 && value < 1000000000) {
            return `${prefix}${(value / 100000000).toFixed(1).replace('.0', '')} 億${suffix}`;
          } if (value >= 1000000000 && value < 1000000000000) {
            return `${prefix}${(value / 1000000000).toFixed(1).replace('.0', '')} 十億${suffix}`;
          } if (value >= 1000000000000 && value < 10000000000000) {
            return `${prefix}${(value / 1000000000000).toFixed(1).replace('.0', '')} 百億${suffix}`;
          }

          return `${prefix}${value.toLocaleString()}${suffix}}`;
        },
      },
    },
  },
});

const filterSelectedDate = ref([
  moment().startOf('month').format('YYYY-MM-DD'),
  moment().endOf('month').format('YYYY-MM-DD'),
]);

// =================
//
// mounted
//

onMounted(() => getSalesDataByChannel());

const getSalesDataByChannel = async () => {
  salesDataByChannel.value = null;

  const data = {
    endpoint: 'voucher_api',
    method: 'POST',
    path: '/voucher/salesByChannelReport',
    data: {
      start: filterSelectedDate.value[0].value,
      end: filterSelectedDate.value[1].value,
    },
  };

  const response = await Axios({
    method: 'POST',
    url: '/relay/general/salesByChannelReport',
    data,
  });

  const { salesByChannel } = response.data.data;

  salesDataByChannel.value = {
    labels: salesByChannel.map((item) => item.name),
    datasets: [
      {
        label: '銷售金額',
        data: salesByChannel.map((item) => item.amount),
        backgroundColor: 'red',
      },
    ],
  };
};

const parsedCell = (cell) => {
  console.log(parsePhoneNumber(cell, { regionCode: 'TW' }).number?.international);
  return parsePhoneNumber(cell, { regionCode: 'TW' }).number?.international;
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'

.v-application
  .text--monospace
    font-family: 'IBM Plex Mono', monospace !important

  .text-caption
    letter-spacing: normal !important

*
  text-transform: none !important

.d-flex,
.d-inline-flex
  &.gap-sm
    gap: $border-radius-root / 2

  &.gap
    gap: $border-radius-root

  &.gap-lg
    gap: $border-radius-root * 2

  &.gap-xl
    gap: $border-radius-root * 4

@mixin border-color($color_value)
  border-color: $color_value !important

@if ($color-pack)
  @each $color_name, $color_color in $colors
    @each $color_type, $color_value in $color_color
      @if ($color_type == 'base')
        .v-application .#{$color_name}--border
          @include border-color($color_value)

      @else if ($color_type != 'shades')
        .v-application .#{$color_name}--border.border--#{$color_type}
          @include border-color($color_value)

.w-full
  width: 100%

.h-full
  height: 100%

.border
  border: 1px solid

.info-container
  .row
    margin: 0 -12px

  .theme--light &
    .row
      &:nth-child(even)
        background-color: map-get($grey, 'lighten-5')

.v-tabs-slider
  margin-left: 8px
  margin-right: 8px
  width: calc(100% - 16px) !important

  border-radius: 4px 4px 0 0

.v-application--is-ltr
  .v-text-field
    .v-input__prepend-inner
      margin-right: 4px

.v-stepper__label
  font-weight: bold

  small
    font-weight: normal

.swal2
  &-container
    &.swal2-backdrop-show
      background: rgba(0, 0, 0, .75) !important

  &-popup
    padding: 0 !important

    border-radius: 16px !important

    background-color: #111 !important

    color: white !important

    &.swal2-show
      animation: showSweetAlert .25s ease !important

    .swal2-content,
    .swal2-html-container
      width: 100% !important
      padding: 32px 24px 16px !important
      margin: 0 !important

      font-size: 16px !important
      font-weight: bold !important
      color: white !important
      text-align: left !important
      white-space: pre-wrap !important

    .swal2-actions
      justify-content: flex-end !important
      padding: 8px 8px 8px 24px !important
      margin: 0 !important

    .swal2-styled
      &.swal2-confirm,
      &.swal2-cancel
        margin: 0 !important
        padding: 16px !important

        border-radius: 0 !important

        background: none !important

        font-size: 14px !important
        font-weight: 700 !important
        color: #ffea00 !important

        outline: none !important
        appearance: none !important

        &:focus
          box-shadow: none !important

        &:hover,
        &:active
          color: #ffea00 !important

          outline: none !important
          transform: scale(.95) !important

      &.swal2-cancel
        color: #656565 !important

thead
  th
    white-space: nowrap

.pointer-events-none
  pointer-events: none

.v-breadcrumbs
  &.theme--light
    .v-breadcrumbs__item
      color: #333

  &.theme--dark
    .v-breadcrumbs__item
      color: white

  & .v-breadcrumbs__item--disabled
    opacity: .5

  & .v-breadcrumbs__divider .v-icon
    opacity: .25

.cursor-pointer
  cursor: pointer

.ProseMirror
  min-height: 150px

  outline: none

.select-all
  user-select: all

.v-tooltip
  &__content
    padding: $spacer*4 $spacer*3
    max-width: 300px
    opacity: 1 !important

    border-radius: $spacer * 2

    font-size: 12px
    line-height: 1.5em

    span
      white-space: pre-wrap
</style>
