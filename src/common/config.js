// 本地服务器地址
// export const baseUrl = 'http://101.43.103.152:3000/'
export const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api' : 'http://101.43.103.152:3000/'
// 线上失败，无法访问
