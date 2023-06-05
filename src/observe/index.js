import { ArrayMethods } from "./arr";
export function observer(data) {
  //判断传入的数据是否正确
  if (typeof data != "object" || data == null) {
    return data;
  }

  //1.给对象设置代理
  return new Observer(data);
}
//vue2 中使用 Object.defineProperty 来给数据设置代理
class Observer {
  constructor(value) {
    
    //给 value 定义一个属性,让它能调用 Observer 对象的方法
    Object.defineProperty(value,"__ob__",{
      enumerable:false,
      value:this //这个 this 指向当前的 Observer 对象
    })

    //判断数据是数组还是对象
    if (Array.isArray(value)) {
      //将数组的原型链指向新创建的原型上
      value.__proto__ = ArrayMethods;
      //处理数组里对象的劫持
      this.observerArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(data) {
    //通过Object.keys 拿到对象所有的key
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      //在这对每个属性进行劫持
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
  observerArray(value) {
    //遍历数组,处理对象的劫持
    value.forEach((item) => {
      observer(item);
    });
  }
}

//对对象中的属性进行劫持
function defineReactive(data, key, value) {
  //使用递归进行深度代理
  observer(value);
  Object.defineProperty(data, key, {
    get() {
      //获取时返回数据
      return value;
    },
    set(newValue) {
      //判断要设置的值是否一致,如果一致直接返回
      if (newValue == value) return;
      //对修改的数据再次进行劫持
      observer(newValue); //如果设置的值是一个对象,就会进行递归为对象设置set和get方法
      value = newValue;
    },
  });
}

//对于对象劫持的一波总结
//1. 因为使用 Object.defineProperty 来对对象进行劫持时,有一个缺点,就是一次只能设置一个属性,所以要使用循环来进行绑定set 和 get方法
//2. 递归 遍历给对象添加set 和 get 方法时,由于只进行一次遍历的话,只会对 对象 的第一层进行设置set 和 get
//{name:"owo",info:{age:1}} 对于这个对象而言,进行遍历设置的话,只是会对 name和 info 设置上 set 和 get,并不会对 info下的 age 设置 get 和 set
//所以 需要在设置 set 和 get 时进行递归操作,将所有的 属性 都设置上 set & get
//3. set 中,有可能用户一开始的值是一个字符串,而后面它将它改成数组了,这个时候那个属性就会没有 set 和 get 了,所以在设置属性时也要进行一次递归来设置属性的set 和 get
