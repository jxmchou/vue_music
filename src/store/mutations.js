
export default {
  // 获取榜单id
  songListIdData(state, value) {
    state.songListId = value
  },
  // 获取榜单数据
  songListData(state, songList) {
    state.songList.push(songList)
  },
  // 获取登录信息
  loginsData(state, value) {
    state.loginData = value
  },
  outLogin(state) {
    state.loginData = {}
    window.sessionStorage.removeItem('loginData')
    window.sessionStorage.removeItem('token')
  },
  // 获取音乐信息
  musicData(state, value) {
    state.musicData = value
    // console.log(state.musicData)
  },
  // 判断是否立即播放
  musicWait(state, value) {
    state.musicWait = value
  }
}
