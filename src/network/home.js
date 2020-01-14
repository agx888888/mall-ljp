import { request } from "./request"

// 首页网络封装
export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
}