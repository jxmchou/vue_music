/**
 * 评论接口，需要登录后获取
 */

import { ajax } from './ajax'
// 发送评论 /comment
/**
 * t:1 发送, 2 回复
 * type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
 * 0: 歌曲 1: mv  2: 歌单  3: 专辑  4: 电台  5: 视频  6: 动态
 * id:对应资源 id
 * content :要发送的内容
 * commentId :回复的评论 id (回复评论时必填)
 * /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
 */
export const sendComment = (t, type, id, content) => {
  return ajax(`/comment?t=${t}&type=${type}&id=${id}&content=${content}`)
}
export const replyComment = (t, type, id, content) => {
  return ajax(
    `/comment?t=${t}&type=${type}&id=${id}&content=${content}&commentId=${commentId}`
  )
}
/**
 * 删除评论 
 * t:0 删除
 * 调用例子 : /comment?t=0&type=1&id=5436712&commentId=1535550516319 (在广岛之恋 mv 删除评论)
 * */
export const deleteComment = (type, id, commentId) => {
  return ajax(
    `/comment?t=0&type=${type}&id=${id}&commentId=${commentId}`
  )
}