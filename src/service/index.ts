import { BASE_URL, TIME_OUT } from './config'
import LeeRequest from './request'
import { toast } from '@/utils/tools'
// import leeDecrypt from '@/utils/decryption'

const interceptors = {
  requestSuccessFn: (config: any) => {
    return config
  },
  responseSuccessFn: (res: any) => {
    // 对响应数据做点什么
    return res.request.responseType == 'blob' ? res : res.data
    // console.log(leeDecrypt(res.data.data))
    // return res.request.responseType == 'blob' ? res : leeDecrypt(res.data.data)
  },
  responseFailureFn: (error: any) => {
    // const formattedContent = Object.entries(error.response?.data)
    //   .map(([key, value]) => `${key}: ${value}`)
    //   .join('\n')
    // const msg = error.response?.data?.msg || formattedContent || '请求失败'
    // toast(msg, 'error')
    toast('请求失败，请刷新页面重试', 'error')
    return Promise.reject(error)
  }
}

const leeRequest = new LeeRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors
})

export { leeRequest }
