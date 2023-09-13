import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorageKey } from '@/shared/lib/localStorage/getLocalStorageKey';
import { setLocalStorageKey } from '@/shared/lib/localStorage/setLocalStorageKey';
import { removeLocalStorageKey } from '@/shared/lib/localStorage/removeLocalStorageKey';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://test-blog-api.ficuslife.com/api/v1';

interface IBadRequest {
    response?: {
        data: any;
        status: number;
        config: {
            url: string;
            baseURL: string;
            method: string;
        };
    };

    request?: {
        data: any;
        responseURL: string;
    };
}

class HTTPService {
    token: string;

    constructor(url: string) {
        axios.defaults.baseURL = url;
        axios.defaults.headers.common.Accept = 'application/json';
        this.token = getLocalStorageKey(STORAGE_KEY) || '';

        if (this.token) {
            this.setAuthHeader(this.token);
        }
    }

    get(url: string, config?: AxiosRequestConfig) {
        return axios
            .get(url, config)
            .then((res) => this.handleSuccess(res))
            .catch(this.handleError);
    }

    post(url: string, data: Object, config?: AxiosRequestConfig) {
        return axios

            .post(url, data, config)

            .then((res) => this.handleSuccess(res))

            .catch(this.handleError);
    }

    put(url: string, data: Object, config?: AxiosRequestConfig) {
        return axios

            .put(url, data, config)

            .then((res) => this.handleSuccess(res))

            .catch(this.handleError);
    }

    patch(url: string, data: Object, config?: AxiosRequestConfig) {
        return axios

            .patch(url, data, config)

            .then((res) => this.handleSuccess(res))

            .catch(this.handleError);
    }

    delete(url: string, data?: Object, config?: AxiosRequestConfig) {
        return axios

            .delete(url, config)

            .then((res) => this.handleSuccess(res))

            .catch(this.handleError);
    }

    handleSuccess(response: any) {
        return response.data;
    }

    setAuthHeader(tokenCode: string) {
        const token = 'Bearer ' + tokenCode;
        setLocalStorageKey<string>(STORAGE_KEY, tokenCode);
        axios.defaults.headers.common.Authorization = token ? token : '';
    }

    handleError(error: IBadRequest) {
        const payload = error.response ? error.response : error?.request?.data;

        if (
            error.response?.status === 401 &&
            error.response?.config.url !== `${error.response?.config.baseURL}/users` &&
            error.response?.config.method !== 'post'
        ) {
            removeLocalStorageKey(STORAGE_KEY);
            window.location.href = '/login';
        }
        throw payload;
    }
}

export const STORAGE_KEY = 'AUTH_TOKEN';
export default new HTTPService(API_URL);
