//使用proxy代理服务器，mockjs模拟数据
// var proxy = {
//   local:"http://localhost:9999",//mock环境
// }
// var config = {
//   dev: {
//       historyApiFallback: true,
//       stats: { colors: true },
//       hot: true,
//       inline: true,
//       progress: true,
//       disableHostCheck:true,
//       //contentBase:"./app/index",
//       proxy: {
//           '/api/mock': {
//             target: proxy.local, //pathRewrite: {'^/column' : '/column'},                
//               secure: false,
//               changeOrigin: true
//           }
//       }
//   },
// }
// module.exports = config;