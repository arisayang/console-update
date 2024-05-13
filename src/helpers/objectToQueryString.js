/* eslint-disable */
function objectToQueryString(obj, prefix = '') {
  const queryParams = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const paramName = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === 'object' && value != null ) {
        queryParams.push(objectToQueryString(value, paramName));
      } else if(value){
        queryParams.push(`${paramName}=${encodeURIComponent(value)}`);
      }
    }
  }

  return queryParams.join('&');
}

export default objectToQueryString;
