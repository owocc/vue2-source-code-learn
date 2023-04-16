// 初始化状态
export function initStatus(vm) {
    //声明一个变量表示用户的配置项
    const opts = vm.$options
    //判断用户提供的配置项有哪些属性,有就进行初始化

    //初始化 props
    if(opts.props){
        initProps()
    }
    // 初始化 data
    if(opts.data){
        initData()
    }

    //初始化 watch
    if(opts.watch){
        initWatch()
    }

    //初始化 computed
    if(opts.computed){
        initComputed()
    }

    //初始化 methods
    if(opts.methods){
        initMethods()
    }
}

function initProps(){}
function initWatch(){}
function initComputed(){}
function initMethods(){}


function initData(){}