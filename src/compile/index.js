/*
    将下面这种 Html 标签格式的文本,解析成功 ast 语法树
    <div id="app"> <span>Hello Vue</span> </div>

    也就是下面这样:
    {
        tag:'div',
        arrts:[{id:'app'}],
        children:[{tag:'span',text:'Hello Vue'}]
    }
*/

// 正则匹配
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配开始标签
const startTagClose = /^\s*(\/?)>/; // 匹配开始标签结束
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //匹配结束标签
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; //匹配标签内的属性
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

//开始标签
function start(tag, attrs) {
  console.log(tag, attrs, "开始标签");
}

function charts(text) {
  console.log(text);
}

//结束标签
function end(tag) {
  console.log(tag, "结束标签");
}

// 遍历字符串得到 ast 语法树
function parseHTML(html) {
  //当 html 为空的时候结束
  while (html) {
    //判断标签
    let textEnd = html.indexOf("<");

    if (textEnd === 0) {
      // 开始标签
      const startTagMatch = parseStartTag(); //开始标签的内容
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      // 匹配结束标签
      let endTagMatch = html.match(endTag);

      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }

    //解析文本
    let text;
    if (textEnd > 0) {
      //获取文本内容,因为 textEnd 是获取到 < 的位置,当上面条件走完, < 不是 0 的位置时,就表示前面有文本内容
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      //获取文本
      charts(text);
    }
  }

  // 解析开始标签
  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      // 创建语法树
      let match = {
        tagName: start[1], //将标签名添加到 match 对象上
        attrs: [],
      };

      // 删除开始标签
      advance(start[0].length);

      //遍历标签属性
      let attr;
      let end;
      // 通过循环遍历添加属性到 match
      // 循环到条件为 结束的标签不为空  end = html.match(startTagClose) 并且会给 end 赋值
      // 用于匹配是否还有结束标签,前面使用取反,表示还没有匹配到结尾 !(end = html.match(startTagClose))
      // (attr = html.match(attribute)) 便是用于匹配到属性,匹配到了就会将属性赋值给 attr
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        // 这里通过正则匹配提取出属性名和属性值,然后追加到 match 中
        match.attrs.push({
          name: attr[1], // 索引1 的位置就是属性的名称
          value: attr[3] || attr[4] || attr[5], // 索引3,4,5的位置都有可能是属性的值(反正目前4,5都是undefined)
        });
        advance(attr[0].length);
        // break;
      }
      // 如果end有值了表示已经到了结尾
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  // 删除 html 中的字符,根据 传入的数量来删除字符串
  function advance(n) {
    html = html.substring(n);
  }
}

// 将 html元素变成 ast 语法树
export function compileToFunction(el) {
  let ast = parseHTML(el);
}
