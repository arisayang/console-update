const vuetifyColors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
  'grey',
  'shades',
];

const chartGradient = {
  defs: {},
};

vuetifyColors.forEach((color) => {
  const verticalGradientId = `vertical-gradient-${color}`;
  const horizontalGradientId = `horizontal-gradient-${color}`;

  chartGradient.defs[verticalGradientId] = {
    tagName: 'linearGradient',
    id: verticalGradientId,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 1,
    children: [
      { id: `${verticalGradientId}-stop-0`, tagName: 'stop', offset: 0 },
      { id: `${verticalGradientId}-stop-1`, tagName: 'stop', offset: 1 },
    ],
  };

  chartGradient.defs[horizontalGradientId] = {
    tagName: 'linearGradient',
    id: horizontalGradientId,
    x1: 0,
    x2: 1,
    y1: 0,
    y2: 0,
    children: [
      { id: `${horizontalGradientId}-stop-0`, tagName: 'stop', offset: 0 },
      { id: `${horizontalGradientId}-stop-1`, tagName: 'stop', offset: 1 },
    ],
  };
});

export default chartGradient;
