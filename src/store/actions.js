import Vue from 'vue'
import {
  topList,
  playList,
  musicUrl,
  musicLyric,
  musicCheck
} from '@/common/playlistAPI'
import { phoneLogin, loginData } from '@/common/api'
export default {
  // 获取榜单id函数
  async getTopListId({ commit }) {
    const { data: res } = await topList()
    let songListArr = []
    res.list.forEach((item) => {
      songListArr.push(item.id)
    })
    commit('songListIdData', songListArr)
  },
  // 获取榜单数据
  async getTopList({ commit }) {
    const { data: res } = await topList()
    // console.log(context);
    let songListArr = []
    res.list.forEach((item) => {
      songListArr.push(item.id)
    })
    songListArr.length = 4
    songListArr.forEach(async (item) => {
      const { data: res } = await playList(item)
      res.playlist.tracks.length = 3
      commit('songListData', res.playlist)
    })
  },
  // 获取用户登录信息函数
  async getLoginData({ commit }, value) {
    const { data: res } = await phoneLogin(value)
    // console.log(res)
    if (res.code === 200) {
      const obj = {
        token: res.token,
        Id: res.profile.userId,
        name: res.profile.nickname,
        avatar: res.profile.avatarUrl
      }
      commit('loginsData', obj)
      window.sessionStorage.setItem('loginData', JSON.stringify(obj))
      window.sessionStorage.setItem('token', res.token)
    }
  },
  // 获取用户信息
  async getUserData() {
    const { data: res } = await loginData()
    if (res.code === 200) {
      const obj = {
        Id: res.profile.userId,
        name: res.profile.nickname,
        avatar: res.profile.avatarUrl
      }
      window.sessionStorage.setItem('loginData', JSON.stringify(obj))
    }
  },
  // 获取歌单所有歌曲信息
  async getMusicData({ commit }, value) {
    // console.log(value);
    const obj = {}
    obj.id = value.id
    obj.name = value.name
    obj.cover = value.al.picUrl
    obj.artist = value.ar[0].name
    const { data: res1 } = await musicLyric(value.id)
    obj.lrc = res1.lrc.lyric
    try {
      const { data: res2 } = await musicCheck(value.id)
      if (res2.success == true) {
        const { data: res3 } = await musicUrl(value.id)
        obj.url = res3.data[0].url
        commit('musicData', obj)
      }
    } catch (error) {
      Vue.prototype.$message.error('该歌曲无法通过白嫖获取')
    }
  }
}
