import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import router from '../router/index';
import { clearCtk } from '../store/client';

const baseURL = process.env.VUE_APP_CONSOLE_API || 'https://api-console.ocard.co';

const Axios = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

Axios.interceptors.request.use(
  (instance) => {
    const config = instance;

    const ctk = Cookies.get('ctk') || null;

    if (ctk) {
      config.headers.Authorization = `Bearer ${ctk}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response?.data?.message) {
        Swal.fire({
          text: error.response.data.message,
          allowOutsideClick: false,
        })
          .then(() => {
            if (error.response?.data?.logout) {
              clearCtk();
            }

            if (error.response?.data?.redirect) {
              if (typeof error.response.data.redirect === 'object') {
                router.push(error.response.data.redirect);
              } else {
                window.location.replace(error.response.data.redirect);
              }
            }

            if (error.response?.data?.reload) {
              window.location.reload();
            }
          });
      } else {
        if (error.response?.data?.logout) {
          clearCtk();
        }

        if (error.response?.data?.redirect) {
          if (typeof error.response.data.redirect === 'object') {
            router.push(error.response.data.redirect);
          } else {
            window.location.replace(error.response.data.redirect);
          }
        }

        if (error.response?.data?.reload) {
          window.location.reload();
        }
      }
    }

    return Promise.reject(error);
  },
);

export default Axios;
