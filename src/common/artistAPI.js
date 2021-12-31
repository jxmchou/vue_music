import { ajax } from './ajax'

// 获取歌手接口
/* 歌手分类列表
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 
initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 
返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1, #传 0
type 取值: -1:全部  1:男歌手  2:女歌手  3:乐队
area 取值: -1:全部  7华语 96欧美  8:日本  16韩国  0:其他
接口地址 : /artist/list
调用例子 : /artist/list?type=1&area=96&initial=b /artist/list?type=2&area=2&initial=b
 */
export const artistList = () => {
  return ajax(`/artist/list?limit=30`)
}
export const singerList = (area, type, initial, offset, limit) => {
  return ajax(
    `/artist/list?area=${area}&type=${type}&initial=${initial}&offset=${offset}&limit=${limit}`
  )
}
/* 可选参数 :
type : 地区
1: 华语
2: 欧美
3: 韩国
4: 日本 */
// 歌手榜 调用例子 : /toplist/artist
export const defaultSinger = () => {
  return ajax(`/toplist/artist`)
}
export const singers = (type) => {
  return ajax(`/toplist/artist?type=${type}`)
}
// 获取歌手详情 /artist/detail?id=6452
export const artistDetail = (id) => {
  return ajax(`/artist/detail?id=${id}`)
}
// 获取相似歌手 /simi/artist?id=6452
export const artistSimilar = (id) => {
  return ajax(`/simi/artist?id=${id}`)
}
// 歌手热门 50 首歌曲 /artist/top/song?id=6452
export const artistHotSong = (id) => {
  return ajax(`/artist/top/song?id=${id}`)
}
// 歌手专辑（可分页加参数） /artist/album?id=6452&limit=12
export const artistAlbum = (id) => {
  return ajax(`/artist/album?id=${id}&limit=12`)
}
// 歌手mv /artist/mv?id=6452
export const artistMv = (id) => {
  return ajax(`/artist/mv?id=${id}&limit=12`)
}
// 歌手介绍获取歌手描述 /artist/desc?id=6452
export const artistDesc = (id) => {
  return ajax(`/artist/desc?id=${id}`)
}
// 收藏/取消收藏歌手 t:操作,1 为收藏,其他为取消收藏 /artist/sub?id=6452&t=1 
export const artistSub = (id,t) => {
  return ajax(`/artist/desc?id=${id}&t=${t}`)
}
