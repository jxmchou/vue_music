// 本地服务器地址
// export const baseUrl = 'https://ychzx.top/api/'
// export const baseUrl = 'https://lianghj.top:3000'
// 101.43.103.152
export const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api' : 'https://ychzx.top/api'
