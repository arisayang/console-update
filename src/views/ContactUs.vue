<template>
  <v-app>
    <v-app-bar
      app
      dense
      :color="$vuetify.theme.dark ? null : '#FFEA00'"
      elevate-on-scroll
    >
      <v-toolbar-title v-if="$route.meta && $route.meta.appBarTitle" class="font-weight-bold">
        {{ $route.meta.appBarTitle }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="my-4">
        <v-row>
          <v-col>
            <v-container fluid class="px-0">
              <v-row justify="space-between" dense>
                <v-col cols="auto">
                  <v-menu
                    v-model="showMenu"
                    offset-y
                    elevation="0"
                    rounded="lg"
                    nudge-bottom="8px"
                    :close-on-content-click="false"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        text
                        rounded
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon left>
                          mdi-calendar-range
                        </v-icon>
                        <template v-if="filterSelectedDate[0] === filterSelectedDate[1]">
                          {{ moment(filterSelectedDate[0]).format("l") }}
                        </template>
                        <template v-else>
                          {{ moment(filterSelectedDate[0]).format("l") }}
                          ～
                          {{ moment(filterSelectedDate[1]).format("l") }}
                        </template>
                      </v-btn>
                    </template>
                    <v-card elevation="0">
                      <v-container class="pa-0">
                        <v-row no-gutters>
                          <v-col>
                            <v-list
                              class="grey"
                              :class="{
                                grey: !$vuetify.theme.dark,
                                'lighten-4': !$vuetify.theme.dark,
                                'darken-3': $vuetify.theme.dark,
                              }"
                              shaped
                              dense
                            >
                              <v-list-item-group v-model="selectedFilterSelectedDateRange">
                                <v-list-item
                                  v-for="range in filterSelectedDateRanges"
                                  :key="range.range"
                                  :value="range"
                                >
                                  <v-list-item-content class="text-subtitle-2">
                                    {{ range.text }}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item value="CUSTOM">
                                  <v-list-item-content class="text-subtitle-2">
                                    自訂
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                          </v-col>
                          <v-col>
                            <div
                              style="height: 100%"
                              class="d-flex flex-column
                            justify-space-between"
                            >
                              <v-date-picker
                                v-model="filterSelectedDate"
                                class="rounded-0 date-filter"
                                range
                                no-title
                                color="indigo"
                              />
                              <div
                                style="height: 100%"
                                class="d-flex justify-end align-center px-2"
                              >
                                <v-btn
                                  elevation="0"
                                  rounded
                                  :disabled="applyDateDisabled"
                                  @click="onClickApplyDate"
                                >
                                  套用
                                </v-btn>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-menu>
                </v-col>
                <v-col
                  v-if="selectedItems.length !== 0"
                  cols="auto"
                  transition="scroll-y-transition"
                >
                  <v-btn
                    elevation="0"
                    text
                    rounded
                    @click="onClickExport()"
                  >
                    匯出
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-card rounded="lg" elevation="2">
              <v-tabs
                v-model="currentTab"
                class="px-4"
                slider-size="4"
                :color="$vuetify.theme.dark ? 'white' : 'indigo'"
              >
                <v-tab v-for="tab in tabs" :key="tab.token">
                  {{ tab.text }}
                </v-tab>
              </v-tabs>
              <v-divider />
              <div class="pa-4">
                <v-container fluid class="pa-0">
                  <v-row align="center" dense>
                    <v-col>
                      <v-text-field
                        v-model.trim="keyword"
                        dense
                        rounded
                        filled
                        label="搜尋"
                        prepend-inner-icon="mdi-magnify"
                        hide-details
                        clearable
                        @keypress.enter="getData"
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-menu
                        class="mt-4"
                        rounded
                        offset-y
                        transition="scroll-y-transition"
                        :close-on-click="false"
                        allow-overflow
                        max-height="500"
                        loading
                        loading-text="資料取得中⋯"
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            elevation="0"
                            :color="$vuetify.theme.dark ? 'white' : 'indigo'"
                            text
                            rounded
                            v-on="on"
                          >
                            <v-icon left>
                              mdi-eye
                            </v-icon>
                            查看欄位
                          </v-btn>
                        </template>
                        <v-card class="pa-4">
                          <v-checkbox
                            v-for="header in optionalHeaders"
                            :key="header.text"
                            v-model="header.display"
                            dense
                            :label="header.text"
                            hide-details
                          />
                        </v-card>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
              <v-data-table
                v-model="selectedItems"
                class="rounded-lg"
                :headers="displayHeaders"
                :items="items"
                :loading="tableLoading"
                item-key="idx"
                show-expand
                show-select
                single-expand
                :hide-default-footer="true"
                :disable-pagination="true"
              >
                <template #top>
                  <v-dialog v-model="showAssignDialog" max-width="500px">
                    <v-card>
                      <v-form v-model="editedItemForm">
                        <v-card-title>
                          <span class="text-h5">指派「{{ editedItem.name }}」</span>
                        </v-card-title>
                        <v-card-text>
                          <v-autocomplete
                            v-model="editedItemFormVtigerUser"
                            filled
                            rounded
                            label="Vtiger 使用者"
                            hide-details="auto"
                            prepend-inner-icon="mdi-account"
                            :rules="[(v) => !!v || '必填項目']"
                            :items="vTigerUsers"
                            :color="$vuetify.theme.dark ? 'white' : 'indigo'"
                          />
                          <v-checkbox
                            v-model="isBig"
                            dense
                            label="設定為專案型自來客"
                            hide-details
                          ></v-checkbox>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn text rounded @click="showAssignDialog = false">
                            取消
                          </v-btn>
                          <v-btn
                            text
                            rounded
                            :disabled="!editedItemForm"
                            :loading="isSubmittingAssign"
                            :color="$vuetify.theme.dark ? 'white' : 'indigo'"
                            @click="onClickSaveAssign(editedItem.idx, isBig)"
                          >
                            儲存
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="showArchiveDialog" max-width="500px">
                    <v-card>
                      <v-form v-model="editedItemForm">
                        <v-card-title>
                          <span class="text-h5">封存「{{ editedItem.name }}」</span>
                        </v-card-title>
                        <v-card-text>
                          <v-autocomplete
                            v-model="editedItemFormArchiveReason"
                            filled
                            rounded
                            label="封存原因"
                            hide-details="auto"
                            prepend-inner-icon="mdi-inbox-arrow-down"
                            :rules="[(v) => !!v || '必填項目']"
                            :items="archiveReasons"
                            :color="$vuetify.theme.dark ? 'white' : 'indigo'"
                          />
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn text rounded @click="showArchiveDialog = false">
                            取消
                          </v-btn>
                          <v-btn
                            text
                            rounded
                            :disabled="!editedItemForm"
                            :loading="isSubmittingArchive"
                            :color="$vuetify.theme.dark ? 'white' : 'indigo'"
                            @click="onClickSaveArchive(editedItem.idx)"
                          >
                            確定
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </template>

                <template #item.status="{ item }">
                  <v-chip
                    v-if="item.status === 'NEW'"
                    class="font-weight-bold"
                    color="indigo"
                    dark
                  >
                    未指派
                  </v-chip>
                  <v-chip v-else-if="item.status === 'OPPORTUNITY'" class="font-weight-bold" dark>
                    Opportunity
                  </v-chip>
                  <v-chip v-else-if="item.status === 'LEAD'" class="font-weight-bold" dark>
                    Lead
                  </v-chip>
                  <v-chip v-else-if="item.status === 'ARCHIVED'" class="font-weight-bold">
                    已封存
                  </v-chip>
                </template>
                <template #item.service="{ item }">
                  <div v-if="item.service" class="py-2">
                    <div v-for="service in item.service.split(',')" :key="service" class="my-1">
                      <v-chip x-small>
                        {{ service.trim() }}
                      </v-chip>
                    </div>
                  </div>
                </template>

                <template #item.content="{ item }">
                  <template v-if="item.content">
                    <v-icon>mdi-comment</v-icon>
                  </template>
                </template>

                <template #item.time="{ item }">
                  {{ moment(item.time).format("l LT") }}
                </template>

                <template #item.assigned="{ item }">
                  <template v-if="item.assigned">
                    <span>{{ item.assigned }}</span>
                  </template>
                  <template v-else>
                    <v-btn v-if="item.status === 'NEW'" icon @click="onClickAssign(item)">
                      <v-icon>mdi-account-edit</v-icon>
                    </v-btn>
                  </template>
                </template>

                <template #item.archive="{ item }">
                  <v-btn v-if="item.status === 'NEW'" icon @click="onClickArchive(item)">
                    <v-icon>mdi-inbox-arrow-down</v-icon>
                  </v-btn>
                </template>

                <template #expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <v-container class="my-4">
                      <v-row justify="center">
                        <v-col cols="12" md="6">
                          <v-card>
                            <v-list dense>
                              <v-list-item v-if="item.company">
                                <v-list-item-content>
                                  公司名稱
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.company }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.businessModel">
                                <v-list-item-content>
                                  是否為加盟店
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.businessModel }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.contact">
                                <v-list-item-content>
                                  聯絡人
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.contact }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.phone">
                                <v-list-item-content>
                                  聯絡電話
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.phone }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.email">
                                <v-list-item-content>Email</v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.email }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.content">
                                <v-list-item-content>備註</v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.content }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content>
                                  訂閱電子報
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.newsletter ? "是" : "否" }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.utmSource">
                                <v-list-item-content>
                                  utm_source
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.utmSource }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.utmMedium">
                                <v-list-item-content>
                                  utm_medium
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.utmMedium }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.utmCampaign">
                                <v-list-item-content>
                                  utm_campaign
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.utmCampaign }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.utmContent">
                                <v-list-item-content>
                                  utm_content
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ item.utmContent }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item v-if="item.leadTime">
                                <v-list-item-content>
                                  Leads 建立時間
                                </v-list-item-content>
                                <v-list-item-content class="flex-column align-end text-right">
                                  {{ moment(item.leadTime).format("l LT") }}
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import moment from 'moment';
import {
  ref, reactive, computed, watch, onBeforeMount, Ref,
} from 'vue';
// eslint-disable-next-line import/no-cycle
import Axios from '@/helpers/axios';

const showMenu = ref(false);
const filterSelectedDateRanges = ref([
  {
    text: '今天',
    range: 'TODAY',
    value: [
      new Date().toISOString().split('T')[0],
      new Date().toISOString().split('T')[0],
    ],
  },
  {
    text: '昨天',
    range: 'YESTERDAY',
    value: [
      new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split('T')[0],
      new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split('T')[0],
    ],
  },
  {
    text: '本週',
    range: 'THIS_WEEK',
    value: [
      new Date(new Date().setDate(new Date().getDate() - new Date().getDay()))
        .toISOString()
        .split('T')[0],
      new Date().toISOString().split('T')[0],
    ],
  },
  {
    text: '上週',
    range: 'LAST_WEEK',
    value: [
      new Date(
        new Date().setDate(new Date().getDate() - new Date().getDay() - 7),
      )
        .toISOString()
        .split('T')[0],
      new Date(
        new Date().setDate(new Date().getDate() - new Date().getDay() - 1),
      )
        .toISOString()
        .split('T')[0],
    ],
  },
  {
    text: '過去 7 天',
    range: 'RECENT_7',
    value: [
      new Date(new Date().setDate(new Date().getDate() - 6))
        .toISOString()
        .split('T')[0],
      new Date().toISOString().split('T')[0],
    ],
  },
  {
    text: '本月',
    range: 'THIS_MONTH',
    value: [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split('T')[0],
    ],
  },
  {
    text: '過去 30 天',
    range: 'RECENT_30',
    value: [
      new Date(new Date().setDate(new Date().getDate() - 29))
        .toISOString()
        .split('T')[0],
      new Date().toISOString().split('T')[0],
    ],
  },
  {
    text: '過去一年',
    range: 'RECENT_YEAR',
    value: [
      new Date(
        new Date().getFullYear() - 1,
        new Date().getMonth(),
        new Date().getDate(),
      )
        .toISOString()
        .split('T')[0],
      new Date().toISOString().split('T')[0],
    ],
  },
]);
const selectedFilterSelectedDateRange = ref('THIS_MONTH');
const filterSelectedDate = ref([
  moment().startOf('month').format('YYYY-MM-DD'),
  moment().endOf('month').format('YYYY-MM-DD'),
]);
const selectedDate = ref([
  moment().subtract(29, 'days').format('YYYY-MM-DD'),
  moment().format('YYYY-MM-DD'),
]);
const applyDateDisabled: Ref<boolean> = ref(false);
const currentTab = ref(0);
const currentTabType = ref('NEW');
const tabs = ref([
  {
    text: '未指派',
    token: 0,
    type: 'NEW',
  },
  {
    text: 'Lead',
    token: 1,
    type: 'LEAD',
  },
  {
    text: 'Opportunity',
    token: 2,
    type: 'OPPORTUNITY',
  },
  {
    text: '全部',
    token: 3,
    type: 'ALL',
  },
]);
const showAssignDialog = ref(false);
const isSubmittingAssign = ref(false);
const showArchiveDialog = ref(false);
const isSubmittingArchive = ref(false);
const vTigerUsers = ref([]);
const archiveReasons = ref([
  '已有業務聯繫',
  '自來客無效-型態不適合',
  '自來客無效-資料有誤',
  '自來客無效-既有客戶',
  '自來客無效-重複名單',
]);
const tableLoading = ref(false);
const headers = ref([
  {
    text: '名單狀態',
    align: 'start',
    sortable: false,
    value: 'status',
    groupable: true,
    display: true,
    exportSort: 21,
  },
  {
    text: '品牌名稱',
    align: 'start',
    sortable: false,
    value: 'name',
    groupable: true,
    display: true,
    exportSort: 1,
  },
  {
    text: '地區',
    align: 'start',
    sortable: false,
    value: 'location',
    groupable: true,
    display: true,
    exportSort: 5,
  },
  {
    text: '分店數量',
    align: 'start',
    sortable: false,
    value: 'storeCount',
    groupable: true,
    display: true,
    exportSort: 6,
  },
  {
    text: '產業類別',
    align: 'start',
    sortable: false,
    value: 'type',
    groupable: true,
    display: true,
    exportSort: 8,
  },
  {
    text: '備註',
    align: 'center',
    sortable: false,
    value: 'content',
    groupable: true,
    display: true,
    exportSort: 3,
  },
  {
    text: '名單建立時間',
    align: 'center',
    sortable: false,
    value: 'time',
    groupable: true,
    display: true,
    exportSort: 20,
  },
  {
    text: '是否有營登',
    align: 'start',
    sortable: false,
    value: 'registered',
    groupable: true,
    display: false,
    exportSort: 7,
  },
  {
    text: '名單指派業務',
    align: 'center',
    sortable: false,
    value: 'assigned',
    groupable: true,
    display: true,
    exportSort: 23,
  },
  {
    text: '封存',
    align: 'center',
    sortable: false,
    value: 'archive',
    groupable: true,
    display: true,
  },
  {
    text: '了解服務',
    align: 'start',
    sortable: false,
    value: 'service',
    groupable: true,
    display: false,
    width: '60px',
    exportSort: 9,
  },
  {
    text: '',
    value: 'data-table-expand',
    display: true,
  },
]);
const exportHeaders = ref([
  {
    label: '公司名稱',
    value: 'company',
    exportSort: 2,
  },
  {
    label: '是否為加盟店',
    value: 'businessModel',
    exportSort: 4,
  },
  {
    label: '聯絡人',
    value: 'contact',
    exportSort: 10,
  },
  {
    label: '聯絡電話',
    value: 'phone',
    exportSort: 11,
  },
  {
    label: 'Email',
    value: 'email',
    exportSort: 12,
  },
  {
    label: '訂閱電子報',
    value: 'newsletter',
    exportSort: 13,
  },
  {
    label: '實體門市',
    value: 'brickAndMortar',
    exportSort: 14,
  },
  {
    label: 'utmSource',
    value: 'utmSource',
    exportSort: 15,
  },
  {
    label: 'utmMedium',
    value: 'utmMedium',
    exportSort: 16,
  },
  {
    label: 'utmCampaign',
    value: 'utmCampaign',
    exportSort: 17,
  },
  {
    label: 'utmContent',
    value: 'utmContent',
    exportSort: 18,
  },
  {
    label: '是否為專案型',
    value: 'isBig',
    exportSort: 19,
  },
  {
    label: '名單封存原因',
    value: 'archivedReason',
    exportSort: 22,
  },
  {
    label: 'Leads建立時間',
    value: 'leadTime',
    exportSort: 24,
  },
  {
    label: 'Leads狀態',
    value: 'leadStatus',
    exportSort: 25,
  },
  {
    label: 'Leads無效原因',
    value: 'invalidReason',
    exportSort: 26,
  },
  {
    label: 'Opp建立時間',
    value: '',
    exportSort: 27,
  },
  {
    label: 'Opp狀態',
    value: 'opportunityStatus',
    exportSort: 28,
  },
  {
    label: 'CloseWon時間',
    value: 'closedWonTime',
    exportSort: 29,
  },
  {
    label: '成交金額',
    value: 'amount',
    exportSort: 30,
  },
  {
    label: '合約名稱',
    value: 'subject',
    exportSort: 31,
  },
  {
    label: '合約抬頭',
    value: 'title',
    exportSort: 32,
  },
  {
    label: '合約檔名',
    value: 'contractNo',
    exportSort: 33,
  },
]);
const keyword = ref(null);
const items = ref<any[]>([]);
const editedIndex = ref(-1);
const editedItem = reactive({
  idx: 0,
  name: '',
  brand: '',
  contact: '',
  phone: '',
  email: '',
  content: '',
  newsletter: false,
  assigned: null,
  time: '',
  enable: 1,
  utmSource: '',
  utmCampaign: '',
  utmMedium: '',
  utmContent: '',
  _brand: null,
  storeCount: '',
  company: '',
  location: '',
  type: '',
  service: '',
  brickAndMortar: '',
  registered: '',
  isBig: false,
});
const editedItemForm = ref(false);
const editedItemFormVtigerUser = ref(null);
const editedItemFormArchiveReason = ref(null);
const selectedItems = ref([]);
const isBig = ref(false);

// =================
//
// computed
//

const optionalHeaders = computed(() => headers.value.filter((header) => !header.display));

const displayHeaders = computed(() => headers.value.filter((header) => header.display));

const csvFields = computed(() => {
  const fields: { label: string; value: string; exportSort: number }[] = [];

  headers.value.forEach((item) => {
    if (
      item.text === ''
      || item.value === 'archive'
      || item.exportSort === undefined
    ) return;
    fields.push({
      label: item.text,
      value: item.value,
      exportSort: item.exportSort,
    });
  });

  const all = fields.concat(exportHeaders.value);
  const sorted = all.sort((a, b) => a.exportSort - b.exportSort);

  return sorted;
});

// =================
//
// watch
//

watch(selectedFilterSelectedDateRange, (range: any) => {
  if (!range) return;

  if (range.range !== 'CUSTOM') filterSelectedDate.value = range.value;

  if (range === 'CUSTOM') filterSelectedDate.value = [];
});

watch(currentTab, () => getData());

watch(
  filterSelectedDate,
  () => {
    applyDateDisabled.value = filterSelectedDate.value.length !== 2;
  },
);

watch(keyword, (value) => {
  if (value === '') {
    keyword.value = null;
  }
});
watch(showAssignDialog, () => {
  editedItemFormVtigerUser.value = null;
  editedItemForm.value = false;
});

watch(showArchiveDialog, () => {
  editedItemFormArchiveReason.value = null;
  editedItemForm.value = false;
});

// =================
//
// mounted
//

onBeforeMount(() => getData());

// =================
//
// methods
//

const getData = () => {
  tableLoading.value = true;
  items.value = [];
  getTabType();

  const data: { type: string; start: string; end: string; keyword?: string } = {
    type: currentTabType.value,
    start: filterSelectedDate.value[0],
    end: filterSelectedDate.value[1],
  };

  if (keyword.value !== null) data.keyword = keyword.value;

  Axios({
    method: 'post',
    url: '/root/contact',
    data,
  })
    .then((response) => {
      if (response.status === 200) {
        response.data.contacts.forEach((item) => {
          items.value.push({
            idx: item.id,
            id: item.idx,
            name: item.name,
            brand: item.brand,
            contact: item.contact,
            content: item.content,
            phone: item.phone,
            email: item.email,
            newsletter: item.newsletter,
            assigned: item.assigned,
            time: item.time,
            enable: 1,
            utmSource: item.utmSource,
            utmCampaign: item.utmCampaign,
            utmMedium: item.utmMedium,
            utmContent: item.utmContent,
            _brand: null,
            storeCount: item.stores,
            company: item.company,
            businessModel: item.businessModel,
            location: item.location,
            type: item.type,
            service: item.service,
            brickAndMortar: item.brickAndMortar,
            registered: item.registered,
            status: item.status,
            opportunityStatus: item.opportunityStatus || null,
            leadStatus: item.leadStatus || null,
            archivedReason: item.archivedReason || null,
            leadTime: item.leadTime || null,
            amount: item.amount || 0,
            invalidReason: item.invalidReason || null,
            isBig: item.isBig,
            closedWonTime: item.closedWonTime,
            subject: item.subject,
            title: item.title,
            contractNo: item.contractNo,
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  setTimeout(() => {
    tableLoading.value = false;
  }, 1000);
};

const convertToCSV = (selected: any, headersData: any, withBOM?: false) => {
  const header = headersData
    .map((headerItem: any) => `"${headerItem.label}"`)
    .join(',');
  const rows = selected.map((obj: any) => headersData
    .map((headerItem: any) => {
      const value = obj[headerItem.value];
      if (typeof value === 'string') {
        return `"${value}"`;
      }
      return value === null ? '' : value;
    })
    .join(','));

  if (withBOM) {
    const utf8BOM = '\uFEFF';
    return `${utf8BOM}${header}\n${rows.join('\n')}`;
  }
  return `${header}\n${rows.join('\n')}`;
};

const onClickExport = () => {
  const csv = convertToCSV(selectedItems.value, csvFields.value);
  const blob = new Blob([csv]);
  const link = window.document.createElement('a');

  link.href = window.URL.createObjectURL(blob);
  link.download = `自來客 - ${new Date().toString()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getTabType = () => {
  const [tabType] = tabs.value.filter((tab) => currentTab.value === tab.token);
  currentTabType.value = tabType.type;
};

const getVtigetUsers = () => {
  Axios({
    method: 'post',
    url: '/root/contact/vtiget-users',
  })
    .then((response) => {
      if (response.status === 200) {
        vTigerUsers.value = response.data.users;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const onClickAssign = (item) => {
  editedItemFormVtigerUser.value = null;
  editedIndex.value = items.value.indexOf(item);
  Object.assign(editedItem, item);
  showAssignDialog.value = true;

  getVtigetUsers();
};

const onClickSaveAssign = (id, isBigData) => {
  isSubmittingAssign.value = true;

  Axios({
    method: 'post',
    url: `/root/contact/${id}`,
    data: {
      assign: editedItemFormVtigerUser.value,
      isBigData,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        isSubmittingAssign.value = false;
        showAssignDialog.value = false;

        getData();
      }
    })
    .catch(() => {
      isSubmittingAssign.value = false;
    });
};

const onClickArchive = (item) => {
  Object.assign(editedItem, item);
  showArchiveDialog.value = true;
};

const onClickSaveArchive = (id) => {
  isSubmittingArchive.value = true;

  Axios({
    method: 'post',
    url: `/root/contact/archive/${id}`,
    data: {
      reason: editedItemFormArchiveReason.value,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        isSubmittingArchive.value = false;
        showArchiveDialog.value = false;

        getData();
      }
    })
    .catch(() => {
      isSubmittingArchive.value = false;
    });
};

const onClickApplyDate = () => {
  showMenu.value = false;
  selectedDate.value = filterSelectedDate.value;

  getData();
};
</script>

<style lang="sass">
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content
  box-shadow: none

.date-filter .v-picker__body
  background-color: transparent
</style>
