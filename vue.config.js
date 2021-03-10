module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "localhost",
    hot: true,
    disableHostCheck: true,
    https: false,
    port: 8080,
    public: "0.0.0.0:8080",
  },
};
