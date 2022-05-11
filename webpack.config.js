const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PROD = process.env.NODE_ENV === "production";

const DEV_PLUGINS = PROD ? [] : [new HTMLWebpackPlugin({
  template: `./public/index.html`,
})]

module.exports = {
  entry: PROD ? `./src/index.ts` : "./src/init.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: 'tagging-canvas',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".js", "css"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
      ...DEV_PLUGINS,
    new MiniCssExtractPlugin(),
  ],
};
