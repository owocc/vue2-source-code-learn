import { initStatus } from "./initStatus";
import { compileToFunction } from "./compile/index";
//将初始化操作模块化,放在 init.js中,这里接收一个 Vue 对象,并给它的原型链上挂载 初始化方法
export function initMixin(Vue) {
  //初始化方法
  Vue.prototype._init = function (options) {
    const vm = this;
    //将用户传入的配置对象挂载到对象上
    vm.$options = options;
    //初始化状态
    initStatus(vm);

    //初始化
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    let vm = this;
    el = document.querySelector(el);
    let options = vm.$options;
    //判断是不是没有 render 方法
    if (!options.render) {
      let template = options.template;
      //判断是否 template 不存在,但 el 存在
      if (!template && el) {
        //获取 html
        el = el.outerHTML;
        //将 html 变成 ast 语法树
        let ast = compileToFunction(el);
      }
    }
  };
}
