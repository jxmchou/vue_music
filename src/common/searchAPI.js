import { ajax } from './ajax'
/**
 * 调用例子 : /search?keywords= 海阔天空 /cloudsearch?keywords= 海阔天空
 * keywords : 关键词
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单,
 * 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * */
export const search = (word, type, offset, limit) => {
  return ajax(
    `/cloudsearch?keywords=${word}&type=${type}&offset=${offset}&limit=${limit}`
  )
}
/**
 * 搜索建议 /search/suggest
 * 必选参数 : keywords : 关键词
 * 可选参数 : type : 如果传 'mobile' 则返回移动端数据
 * /search/suggest?keywords= 海阔天空 /search/suggest?keywords= 海阔天空&type=mobile
 */
export const searchSuggest = (word) => {
  return ajax(`/search/suggest?keywords=${word}`)
}
