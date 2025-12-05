/*
  对axios进行二次封装
  好处:
    1、针对特定的请求进行特定的拦截
    2、可进行多实例请求，互不干扰
    3、get、post请求
*/
import axios from 'axios'
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface LeeInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface LeeRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: LeeInterceptors<T>
}

class LeeRequest {
  instance: AxiosInstance

  constructor(config: LeeRequestConfig) {
    this.instance = axios.create(config)

    // 给每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        // console.log('全局请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功的拦截')
        return res
      },
      (err) => {
        // console.log('全局响应失败的拦截')
        return Promise.reject(err)
      }
    )

    // 给特定的实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 使用泛型对返回结果的类型处理
  request<T = any>(config: LeeRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig
      )
    }

    // 单次响应的拦截，返回Promise，在Promise中进行拦截
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config) // request第二个类型的定义就是请求结果的类型定义
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: LeeRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: LeeRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: LeeRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: LeeRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
  put<T = any>(config: LeeRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
}

export default LeeRequest
