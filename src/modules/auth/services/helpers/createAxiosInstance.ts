import axios, { HttpStatusCode } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import AuthService from '../AuthService.ts';

export const API_URL = `http://localhost:5000`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

function createRetryTracker() {
    const retriedRequests = new Set<string>();

    return {
        markAsRetried: (url: string) => retriedRequests.add(url),
        hasBeenRetried: (url: string) => retriedRequests.has(url),
        reset: (url: string) => retriedRequests.delete(url)
    };
}

const retryTracker = createRetryTracker();

async function handleUnauthorizedError(originalConfig: AxiosRequestConfig, requestUrl: string) {
  try {
    const { accessToken } = await AuthService.refresh();

    localStorage.setItem('token', accessToken);

    return $api.request({
      ...originalConfig,
      headers: {
        ...originalConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    console.error('Ошибка обновления токена: ', e);
    localStorage.removeItem('token');
    retryTracker.reset(requestUrl);
  }
}

$api.interceptors.response.use((config) => {
    return config;
}, async (error: unknown) => {

    if (axios.isAxiosError(error)) {
        const { config, response  } = error;

        if (config?.url) {
            const { url } = config;

            if (response?.status == HttpStatusCode.Unauthorized && !retryTracker.hasBeenRetried(url)) {
              retryTracker.markAsRetried(url);

              return handleUnauthorizedError(config, url);
            }
        }
    }

    throw error;
})

export default $api;
