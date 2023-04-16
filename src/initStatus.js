import { observer } from "./observe/index";

// 初始化状态
export function initStatus(vm) {
  //声明一个变量表示用户的配置项
  const opts = vm.$options;
  //判断用户提供的配置项有哪些属性,有就进行初始化

  //初始化 props
  if (opts.props) {
    initProps();
  }
  // 初始化 data
  if (opts.data) {
    initData(vm);
  }

  //初始化 watch
  if (opts.watch) {
    initWatch();
  }

  //初始化 computed
  if (opts.computed) {
    initComputed();
  }

  //初始化 methods
  if (opts.methods) {
    initMethods();
  }
}

function initProps() {}
function initWatch() {}
function initComputed() {}
function initMethods() {}

//vue2 对data初始化
function initData(vm) {
  //对data 进行判断,因为这里会有两种情况
  //(1) 函数 (2) 对象
  let data = vm.$options.data;
  //通过 typeof 操作符判断是否是一个函数,如果是,就执行函数,得到返回值,否则直接返回data对象
  //这里使用了 call 改变 data 的 this 指向
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  //对数据进行劫持
  observer(data);
}
