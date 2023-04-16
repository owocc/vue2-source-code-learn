//劫持数组方法实现响应式,也就是通过重写数组的方法实现响应式

//1. 获取原来数组的方法
const oldArrayProtoMethods = Array.prototype;

//2. 创建一个对象,继承原来数组的原型(继承)
export const ArrayMethods = Object.create(oldArrayProtoMethods);

//要重写的方法名数组
const methods = ["push", "pop", "unshift", "shift", "splice"];

//遍历要重写的方法名来重写数组的方法
methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    //在执行原数组方法前,可以写一些其它的逻辑
    console.log(`劫持方法 ${item}`);
    //执行数组原来的方法
    const result = oldArrayProtoMethods[item].apply(this,args);
    return result;
  };
});
