## 实现最简 mini-react

目标：在页面中呈现 app
s1: vdom 写死，dom 渲染写死
s2: vdom 动态生成，dom 渲染写死
s3: vdom 动态生成，dom 动态生成（递归）

重构 api

## jsx

借助其他 js 转为 jsx 工具，比如 webpack,babel,vite

浏览器提供了一个 api:requestIdleCallback

## 实现任务调度

## 实现 fiber

问题：每次只渲染几个基点，在下次执行的时候依然从之前的位置执行
解决思路：把树结构转变成链表结构 child,sibling,parent
实现 performUnitOfWork,
1,创建 dom
2,把 dom 添加到父级容器内
3,设置 dom 的 props
4,建立关系 child,sibling,parent
5,返回下一个节点

1.学到了什么？
任务调度和fiber基础实现 
2.遇到问题？
刚开始dom的遍历方式感觉很不习惯，换成链表好理解多了 
3.这节课对自己有什么帮助？
链表结构得到实践，之前基本都是理论为主 
4.哪些知识点可迁移？
链表结构可以多多利用在日常项目中 
5.代码链接
https://github.com/quyapeng/mini-react-learn
欢迎 star