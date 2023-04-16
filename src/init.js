import { initStatus } from "./initStatus";

//将初始化操作模块化,放在 init.js中,这里接收一个 Vue 对象,并给它的原型链上挂载 初始化方法
export function initMixin(Vue) {
  //初始化方法
  Vue.prototype._init = function (options) {
    const vm = this;
    //将用户传入的配置对象挂载到对象上
    vm.$options = options;
    //初始化状态
    initStatus(vm);
  };
}
