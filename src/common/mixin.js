export default {
  filters: {
    // 封装歌单收听量-过滤器
    formatCount(value) {
      if (value >= 10000 && value <= 100000000) {
        value /= 10000
        return value.toFixed(1) + '万'
      } else if (value > 100000000) {
        value /= 100000000
        return value.toFixed(1) + '亿'
      } else {
        return value
      }
    },
    // 封装歌曲评论点赞数-过滤器
    formatTime(value) {
      var date = new Date(value)
      return (
        date.getFullYear() +
        '年' +
        (date.getMonth() + 1) +
        '月' +
        date.getDate() +
        '日'
      )
    },
    // 注册全局具体时间过滤器
    dateFormat(originVal) {
      const dt = new Date(originVal)

      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')

      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    dateFormat1(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      return `${y}.${m}.${d}`
    },
    dateFormat2(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      return `${y}-${m}-${d}`
    },
    // 注册全局歌曲/MV时长转换过滤器
    formatSong(value) {
      const dt = new Date(value)
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${mm}:${ss}`
    }
  }
}
