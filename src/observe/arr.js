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

    //执行数组原来的方法
    const result = oldArrayProtoMethods[item].apply(this, args);

    //对参数的数据进行劫持
    let inserted;
    switch (item) {
      case "push":
      case "unshift":
        inserted = args
        break
      case "splice":
        // 使用 splice 分割传入的参数,比如在外面调用方法 x.splice(1,2,{n:1})
        // 这里的第三个参数(索引为2)的参数才是数据,所以在这获取到数据,前面的参数不管,因为之前已经执行了splice
        inserted = args.splice(2) 
        break
    }

    let ob = this.__ob__
    if(inserted){
      ob.observerArray(inserted)
    }
    return result;
  };
});
