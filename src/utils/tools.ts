import { ElNotification, NotificationParams } from 'element-plus'
import nprogress from 'nprogress'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { i18n } from '@/locales'

dayjs.extend(utc)

/*
  格林尼治时间: 0时区
  北京时间： 格林尼治时间 + 8小时
*/

export function formatUTC(utcString: string, format = 'YYYY/MM/DD HH:mm:ss') {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}

// 显示全屏loading
export function showFullLoading() {
  nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading() {
  nprogress.done()
}

// 消息提示
export function toast(
  message,
  type = 'success',
  dangerouslyUseHTMLString = true
) {
  const options = {
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000
  }
  ElNotification(options as NotificationParams)
}

export function showModal(content = '提示内容', type = 'warning', title = '') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: i18n.global.t('operation.confirm'),
    cancelButtonText: i18n.global.t('operation.cancel'),
    type
  })
}

/**
 * @description 递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {Array} parent 父级菜单
 * @returns object
 */
export const getAllBreadcrumbList = (menuList, result = {}, parent = []) => {
  for (const item of menuList) {
    const { path, icon, name, children } = item
    result[item.path] = [...parent, { path, icon, name, children }]
    if (item.children)
      getAllBreadcrumbList(item.children, result, result[item.path])
  }
  return result
}

/**
 * 对象数组中提取特定信息
 * @param arr 数组
 * @param extractItem 提取字段名
 * @returns 提取信息的数组
 */

export function extractArrMsg<T>(arr: any[], extractItem: T) {
  const extractedIds: T[] = []
  arr.forEach((item) => {
    extractedIds.push(item[extractItem])
    if (item.children) {
      extractedIds.push(...extractArrMsg(item.children, extractItem))
    }
  })
  return extractedIds
}

export function generateSelectOptions(arr: any[]) {
  const optionsRes: any[] = []
  arr.forEach((item) => {
    optionsRes.push({ label: item.name, value: item.id })
    if (item.children) {
      optionsRes.push(...generateSelectOptions(item.children))
    }
  })
  return optionsRes
}

// 路由与面包屑导航栏国际化工具函数
export function generateTitle(title: string) {
  const hasKey = i18n.global.te('navbar.' + title)
  if (hasKey) {
    const translatedTitle = i18n.global.t('navbar.' + title)
    return translatedTitle
  }
  return title
}

export function downloadFile(url: string, filename: string) {
  // const baseURL = import.meta.env.VITE_URL
  const link = document.createElement('a')
  link.style.display = 'none'
  // const request_url = baseURL + url
  const request_url = url
  fetch(request_url)
    .then((res) => res.blob())
    .then((blob) => {
      link.href = URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
}
