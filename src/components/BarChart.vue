<template>
  <div>
    <template v-if="chartData">
      <Bar
        :chart-options="options ? { ...options, ...chartOptions } : chartOptions"
        :data="chartData"
        :style="`height: ${height ? height + 'px' : 'auto'}`"
      />
    </template>
    <template v-else>
      <div class="py-16 text-center">
        資料載入中
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
} from 'chart.js';
import 'chartjs-adapter-moment';

ChartJS.defaults.borderColor = 'rgba(0, 0, 0, .05)';
ChartJS.defaults.font.family = 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// =================
//
// define
//

defineProps({
  options: {
    type: Object,
    default: null,
  },
  height: {
    type: Number,
    default: 0,
  },
  theme: {
    type: String,
    default: '',
  },
});

const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom',
      align: 'start',
      labels: {
        boxWidth: 30,
        boxHeight: 2,
      },
    },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#333',
      bodyColor: '#333',
      borderColor: 'rgba(0, 0, 0, 0.12)',
      padding: 16,
      borderWidth: 1,
      displayColors: false,
      titleMarginBottom: 16,
      titleFont: {
        weight: 'normal',
      },
      bodyFont: {
        size: 12,
      },
      cornerRadius: 16,
      callbacks: {
        label(context) {
          const label = context.dataset.label || '';
          const formattedValue = context.formattedValue || '';
          return `${label} ${this.tooltipValuePrefix || ''}${formattedValue}${this.tooltipValueSuffix || ''}`;
        },
      },
    },
  },
});

</script>
