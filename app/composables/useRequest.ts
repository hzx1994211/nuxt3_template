import type { UseFetchOptions } from "nuxt/app";
import { isMobile } from "~/utils";

export interface RequestOptions extends UseFetchOptions<any> {
  customBaseURL?: string;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T; // 这里的 T 是灵活的
}

//请求拦截
function handleReqponse(options: any) {
  const { token } = useUserStore();
  options.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
}

//响应拦截
function handleResponse(response: any) {
  const { code, message } = response;
  const { clearLogout } = useUserStore();

  if (code !== 0 && import.meta.client) {
    const toast = useToast();
    toast?.add?.({ title: message ?? "请求失败", color: "error" });
  }
  // 清除登录信息
  if (code == 1102) {
    clearLogout();
  }
}

/**
 * 創建請求方法
 * @param method
 */
function useFetchRequest(method: HttpMethod) {
  /**
   * @param url
   * @param data
   * @param isServer  是否服务端渲染
   */
  return async (
    url: string,
    data?: any,
    isServer: boolean = false,
    options: RequestOptions = {},
  ) => {
    const config = useRuntimeConfig();

    const { $i18n } = useNuxtApp();

    // 响应式封装请求参数
    const params = {
      platform: isMobile() ? "h5" : "pc",
      lang: $i18n?.locale?.value,
      timeZone: isServer
        ? "Asia/Shanghai"
        : Intl.DateTimeFormat().resolvedOptions().timeZone,
      req: data,
    };

    const baseURL = import.meta.client
      ? config.public.apiBase
      : `${config.public.apiServeUrl}/api`;

    if (isServer) {
      const { ...fetchOptions } = options;
      const fetchResult: any = useFetch(url, {
        method,
        body: params,
        watch: false,
        key: `api-${method}-${url}-${JSON.stringify(data)}`,
        onRequest({ options }: any) {
          options.baseURL = baseURL;
          handleReqponse(options);
        },
        onResponse({ response }: any) {
          handleResponse(response._data);
        },
        onResponseError({ response }: any) {
          handleResponse(response._data);
        },
        ...fetchOptions,
      });

      // 返回 useFetch 结果，供 setup 顶层使用，确保 SSR 时数据正确传递
      return fetchResult;
    } else {
      const baseURL = config.public.apiBase as string;
      const requestUrl = baseURL + url;

      try {
        const response: ApiResponse = await $fetch(requestUrl, {
          method,
          body: params,
          onRequest({ options: reqOpts }: any) {
            // 请求拦截：统一添加 headers
            handleReqponse(reqOpts);
          },
          onResponse({ response: res }) {
            // 响应拦截：业务状态码校验
            handleResponse(res._data);
          },
          onResponseError({ response: errRes }: any) {
            // 响应错误拦截：HTTP 错误、网络错误
            if (import.meta.client) {
              const toast = useToast();
              toast?.add?.({
                orientation: "horizontal",
                title:
                  errRes?.statusMessage || errRes?.statusText || "请求失败",
                color: "error",
              });
            }
          },
        });
        return response;
      } catch (error) {
        throw error;
      }
    }
  };
}

// export const useFetchGet = useFetchRequest("GET");
export const useFetchPost = useFetchRequest("POST");
// export const useFetchPut = useFetchRequest("PUT");
// export const useFetchDelete = useFetchRequest("DELETE");
