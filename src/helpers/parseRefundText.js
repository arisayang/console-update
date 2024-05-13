import { REFUND_STATUS, RETURN_STATUS, RETURN_REVIEW_STATUS } from '../constant/refund';

export const parseRefundStatusText = (refundStatus) => {
  const obj = {
    text: '',
    color: '',
    textColor: '',
  };
  switch (refundStatus) {
    case REFUND_STATUS.PENDING:
      obj.text = '待退款';
      obj.color = 'orange';
      obj.textColor = 'orange';
      break;
    case REFUND_STATUS.SUCCESS:
      obj.text = '退款成功';
      obj.color = 'green';
      obj.textColor = 'green';
      break;
    case REFUND_STATUS.NOT_HANDLE:
      obj.text = '不需退款';
      obj.color = 'grey';
      break;
    case REFUND_STATUS.FAILED:
      obj.text = '退款失敗';
      obj.color = 'red';
      obj.textColor = 'red';
      break;
    default:
      break;
  }
  return obj;
};

export const parseReturnStatusText = (returnStatus) => {
  const obj = {
    text: '',
    color: '',
    textColor: '',
  };
  switch (returnStatus) {
    case RETURN_STATUS.PENDING:
      obj.text = '待退貨';
      obj.color = 'grey';
      break;
    case RETURN_STATUS.PROCESSING:
      obj.text = '退貨處理中';
      obj.color = 'grey';
      break;
    case RETURN_STATUS.SUCCESS:
      obj.text = '收到退貨';
      obj.color = 'green';
      obj.textColor = 'green';
      break;
    case RETURN_STATUS.NOT_HANDLE:
      obj.text = '不需退貨';
      obj.color = 'grey';
      break;
    case RETURN_STATUS.FAILED:
      obj.text = '退貨失敗';
      obj.color = 'red';
      obj.textColor = 'red';
      break;
    case RETURN_STATUS.EXCEPTION:
      obj.text = '例外狀況';
      obj.color = 'red';
      obj.textColor = 'red';
      break;
    case RETURN_STATUS.DENIED:
      obj.text = '拒絕退貨';
      obj.color = 'red';
      obj.textColor = 'red';
      break;
    default:
      break;
  }
  return obj;
};

export const parseReturnReviewStatusText = (returnReviewStatus) => {
  const obj = {
    text: '',
    color: '',
    textColor: '',
  };
  switch (returnReviewStatus) {
    case RETURN_REVIEW_STATUS.PENDING:
      obj.text = '待接受';
      obj.color = 'orange';
      obj.textColor = 'orange';
      break;
    case RETURN_REVIEW_STATUS.ACCEPTED:
      obj.text = '退貨成立';
      obj.color = 'green';
      obj.textColor = 'green';
      break;
    case RETURN_REVIEW_STATUS.DENIED:
      obj.text = '退貨不成立';
      obj.color = 'red';
      obj.textColor = 'red';
      break;
    case RETURN_REVIEW_STATUS.NOT_HANDLE:
      obj.text = '不需處理';
      obj.color = 'grey';
      break;

    default:
      break;
  }
  return obj;
};

export default { parseRefundStatusText, parseReturnStatusText, parseReturnReviewStatusText };
