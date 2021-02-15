module.exports = {
  devServer: {
    host: "localhost",
    port: 8084,
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        // 允许跨域
        changeOrigin: true,
      },
    },
  },
};
