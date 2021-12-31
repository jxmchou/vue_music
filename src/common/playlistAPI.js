import { ajax } from './ajax'

// 获取热门推荐歌单 推荐歌单
export const personalized = () => {
  return ajax(`/personalized?limit=8`)
}
// 获取所有榜单 /toplist/detail
export const topList = () => {
  return ajax(`/toplist/detail`)
}

// 获取具体歌单 /playlist/detail?id=19723756
export const playList = (id) => {
  return ajax(`/playlist/detail?id=${id}`)
}

// 获取所有歌单 /top/playlist?limit=10&order=new
/* 可选参数 : order: 可选值为 'new' 和 'hot', 
分别对应最新和最热 , 默认为 'hot'
cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 
默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
limit: 取出歌单数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值  */
export const playLists = (offset, limit, cat) => {
  return ajax(`/top/playlist?offset=${offset}&limit=${limit}&cat=${cat}`)
}
// 精品歌单标签列表 /playlist/highquality/tags
export const hotTags = () => {
  return ajax(`/playlist/highquality/tags`)
}
// 获取精品歌单 /top/playlist/highquality?before=0&limit=20
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
export const highQuality = (before, limit, cat) => {
  return ajax(
    `/top/playlist/highquality?before=${before}&limit=${limit}&cat=${cat}`
  )
}
// 相关歌单推荐调用例子 : /related/playlist?id=466225104
export const SongRelated = (id) => {
  return ajax(`/related/playlist?id=${id}`)
}
// 歌单收藏者 /playlist/subscribers?id=544215255&limit=10
export const subscribers = (id) => {
  return ajax(`/playlist/subscribers?id=${id}&limit=10`)
}
// 获取歌单详情 /playlist/detail?id=466225104
export const playlistDetail = (id) => {
  return ajax(`/playlist/detail?id=${id}`)
}
// 获取歌单所有歌曲 /playlist/track/all?id=24381616&limit=10
export const songTracks = (id) => {
  return ajax(`/playlist/track/all?id=${id}&limit=30`)
}
// 歌单评论 /comment/playlist?id=705123491
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
export const songComment = (id, offset, limit) => {
  return ajax(`/comment/playlist?id=${id}&offset=${offset}&limit=${limit}`)
}
// 歌曲评论 /comment/music?id=1900998233&offset=0&limit=20
export const musicComment = (id, offset, limit) => {
  return ajax(`/comment/music?id=${id}&offset=${offset}&limit=${limit}`)
}
// 获取相似音乐 /simi/song?id=1900998233
export const musicSimilar = (id) => {
  return ajax(`/simi/song?id=${id}`)
}
// 获取歌曲详情 /song/detail?ids=1900998233
export const musicDetail = (id) => {
  return ajax(`/song/detail?ids=${id}`)
}
// 获取歌曲url地址 /song/url?id=33894312
export const musicUrl = (id) => {
  return ajax(`/song/url?id=${id}`)
}
// 音乐是否可用 /check/music?id=33894312
export const musicCheck = (id) => {
  return ajax(`/check/music?id=${id}`)
}
// 获取歌词 /lyric?id=33894312
export const musicLyric = (id) => {
  return ajax(`/lyric?id=${id}`)
}
