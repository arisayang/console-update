import { SHIPPING_PROVIDER } from '@/constant/ec-order-shipping-provider';

const parseShippingTitle = (provider) => {
  let title = '';
  switch (provider) {
    case SHIPPING_PROVIDER.T_CAT:
      title = '黑貓宅急便';
      break;
    case SHIPPING_PROVIDER.SEVEN_ELEVEN:
      title = '7-ELEVEN';
      break;
    case SHIPPING_PROVIDER.FAMILY_MART:
      title = '全家便利商店';
      break;

    default:
      break;
  }
  return title;
};

export default parseShippingTitle;
