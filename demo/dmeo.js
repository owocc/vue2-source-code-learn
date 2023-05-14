const oldArrayProtoMethods = Array.prototype

const ArrayMethods = Object.create(oldArrayProtoMethods)

const methods = ["push", "pop", "unshift", "shift", "splice"];


methods.forEach((item) => {
    ArrayMethods[item] = function (...args) {
      //在执行原数组方法前,可以写一些其它的逻辑
      
      //执行数组原来的方法
      const result = oldArrayProtoMethods[item].apply(this,args);
  
      //对参数的数据进行劫持
      let inserted
      switch (item) {
        case "splice":
            inserted = args.splice(2)
            break;
      }
      console.log(inserted);
      return result;
    };
  });
  

const array = [1,2,2,4]
array.__proto__ = ArrayMethods

array.splice(0,2,1)