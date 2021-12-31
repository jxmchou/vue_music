/* // 导入根路径
import { baseUrl } from './config'
// 导入axios
import ajax from 'ajax' */

import { ajax } from './ajax'

// 获取登录信息 login / register
// 登录账号  /login/cellphone?phone=xxx&password=yyy
// export const phoneLogin = (phone, password) =>
//   ajax(`/login/cellphone?phone=${phone}&password=${password}`)
export function phoneLogin(data) {
 return ajax({
   method: 'POST',
   url: '/login/cellphone',
   data
 })
}
// 获取登录信息
export const loginData = () => ajax(`/user/account`)
// 退出登录 /logout
export const outLogin = () => {
  return ajax(`/logout`)
}

// 获取轮播图
export function banner() {
  return ajax(`/banner`)
}

/* 
  可选参数 :
limit: 取出数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
type : new:全部 hot:热门,默认为 new
year : 年,默认本年
month : 月,默认本月
*/
// 获取新碟上架 /top/album?offset=0&limit=30&year=2019&month=6
export const topAlbum = () => {
  return ajax(`/top/album?offset=0&limit=10`)
}
export const topAlbums = (area, offset, limit) => {
  return ajax(`/album/new?area=${area}&offset=${offset}&limit=${limit}`)
}
// 获取最新专辑/新碟 /album/newest
export const newAlbum = () => {
  return ajax(`/album/newest`)
}
// 专辑动态信息 是否收藏,收藏数,评论数,分享数 /album/detail/dynamic?id=137078853
export const dynamic = (id) => {
  return ajax(`/album/detail/dynamic?id=${id}`)
}
// 获取专辑内容 /album?id=137078853
export const album = (id) => {
  return ajax(`/album?id=${id}`)
}
// 专辑评论 /comment/album?id=137078853
export const albumComment = (id, offset, limit) => {
  return ajax(`/comment/album?id=${id}&offset=${offset}&limit=${limit}`)
}

// 获取最新Mv /mv/first?limit=10
export const newMv = () => {
  return ajax(`/mv/first?limit=10`)
}
/* 可选参数 :
area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 
type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
limit: 取出数量 , 默认为 30
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0 */
// 全部 mv /mv/all?area=港台
export const allMvLists = (area, type, order, offset, limit) => {
  return ajax(
    `/mv/all?area=${area}&type=${type}&order=${order}&offset=${offset}&limit=${limit}`
  )
}
// 获取 mv 数据 调用例子 : /mv/detail?mvid=419483
export const mvList = (mvid) => {
  return ajax(`/mv/detail?mvid=${mvid}`)
}
// mv 地址 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址 /mv/url?id=419483
export const mvListUrl = (id) => {
  return ajax(`/mv/url?id=${id}`)
}
// 获取 mv 点赞转发评论数数据 /mv/detail/info?mvid=5436712
// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据
export const mvListInfo = (mvid) => {
  return ajax(`/mv/detail/info?mvid=${mvid}`)
}
// mv 评论 /comment/mv?id=419483&offset=0&limit=20
export const mvListComment1 = (mvid) => {
  return ajax(`/comment/mv?id=${mvid}`)
}
export const mvListComment2 = (mvid, offset, limit) => {
  return ajax(`/comment/mv?id=${mvid}&offset=${offset}&limit=${limit}`)
}
// 获取相似mv视频 /simi/mv?mvid=419483
export const mvListSimi = (mvid) => {
  return ajax(`/simi/mv?mvid=${mvid}`)
}
