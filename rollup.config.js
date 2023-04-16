import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";

export default {
  input: "./src/index.js", //打包的入口文件
  output: {
    file: "dist/vue.js", //打包出口文件
    format: "umd", // 使用 umd 方式会将对象挂载到window
    name: "Vue", //全局变量名称
    sourcemap: true, //将打包前和打包后的文件进行映射
  },
  plugins: [
    //将高级语法转为低级语法
    babel({
      exclude: "node_modules/**", //排除目录
    }),
    //开启一个服务
    serve({
      port: 3000, //指定端口号
      contentBase: "", //如果是空字符串表示当前目录
      openPage: "./index.html",
    }),
  ],
};
