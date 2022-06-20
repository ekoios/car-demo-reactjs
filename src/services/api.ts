import { getI18n } from 'react-i18next';
import { throttle } from 'lodash';
import axios from 'axios';

import validate from 'utils/validate';
import TYPE_CONSTANTS from 'constants/type';
import HTTP_STATUS_CONTSTANTS from 'constants/httpStatus';

const typeOfMessage = TYPE_CONSTANTS.MESSAGE;

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
} as any;

const HEADERS_MULTIPLE_PART = {
  ...HEADERS,
  'Content-Type': 'multipart/form-data; boundary=something',
  Accept: 'application/json',
};

export const getToken = (token: any) => {
  HEADERS['Authorization'] = `Bearer ${token}`;
  HEADERS_MULTIPLE_PART['Authorization'] = `Bearer ${token}`;
};

const getFullUrl = (url: string) => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  console.log(`${process.env.REACT_APP_API_URL}` + url);
  return `${process.env.REACT_APP_API_URL}` + url;
};

const resetToLogin = () => {
  const promiseList = [];
  promiseList.push(localStorage.removeItem('persist:root'));
};

const throttledResetToLogin = throttle(resetToLogin, 500, {
  leading: false,
  trailing: true,
}) as any;

const checkErrorNetwork = (err: any) => {
  if (err?.toJSON() && err.toJSON().message === 'Network Error') {
  }
  return err;
};

const checkErrorStatus = (response: any) => {
  console.log('31321321 :>> ', response);
  if (response?.meta.code === 0 || response?.data?.isVerified === false) {
    console.log('32132132321321 :>> ', 32132132321321);
    return response;
  }
  if (response?.meta?.errorCode) {
    console.log('1111111111111 :>> ', 1111111111111);
  }
  console.log('2321321312 :>> ', 2321321312);
  return response;
};

const api = {
  post: (endpoint: string, params?: any) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response.data);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response.data)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  postMultiplePart: (endpoint: string, params?: any) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response.data);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response.data)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  get: (endpoint: string, params: any = {}) => {
    return axios
      .get(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          console.log('response :>> ', response);
          return checkErrorStatus(response?.data);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response.data)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  put: (endpoint: string, params?: any) => {
    return axios
      .put(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          return checkErrorStatus(response?.data);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response.data)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  patch: (endpoint: string, params?: any) => {
    return axios
      .patch(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          return checkErrorStatus(response?.data);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response.data)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },

  delete: (endpoint: string, params: any) => {
    return axios
      .delete(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response.data);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response.data)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },
};

const apiCustom = {
  get: (endpoint: string, params: any = {}) => {
    return axios
      .get(endpoint, {
        params: params,
        headers: HEADERS,
        validateStatus: (status: any) => validate.validateStatus(status),
      })
      .then(
        (response: any) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          return checkErrorStatus(response?.data);
        },
        (err: any) => {
          return (err?.response?.data && checkErrorStatus(err.response.data)) || checkErrorNetwork(err);
        },
      )
      .catch((response: any) => {
        return response.data;
      });
  },
};

export { api, apiCustom };
