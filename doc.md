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
任务调度和 fiber 基础实现 2.遇到问题？
刚开始 dom 的遍历方式感觉很不习惯，换成链表好理解多了 3.这节课对自己有什么帮助？
链表结构得到实践，之前基本都是理论为主 4.哪些知识点可迁移？
链表结构可以多多利用在日常项目中 5.代码链接
https://github.com/quyapeng/mini-react-learn
欢迎 star

1.学到了什么？
a.优化提交方式，重复的动作可以提炼出来单独执行.b.断点调试 2.遇到问题？
思考的还是不够，functionComponent 第一次就应该想到边缘情况 3.这节课对自己有什么帮助？
还需要多思考，处理好边缘状态。 4.哪些知识点可迁移？
很多项目功能都应该提前考虑到边缘状态。 5.代码链接
https://github.com/quyapeng/mini-react-learn
欢迎 star

1.学到了什么？
a.事件绑定+props 更新 2.遇到问题？
props 理解有点难度 3.代码链接
https://github.com/quyapeng/mini-react-learn
欢迎 star

##

1.学到了什么？
全面考虑边缘情况，优化渲染逻辑 2.遇到问题？
考虑不够周全，还是需要多看多写。 3.这节课对自己有什么帮助？
闭包的方式来解决局部更新，这真的让我有了新的认知。 4.哪些知识点可迁移？
闭包的作用，深入优化渲染逻辑。 5.代码链接
https://github.com/quyapeng/mini-react-learn
欢迎 star

1.学到了什么？
闭包的高级应用 2.遇到问题？
暂无 3.这节课对自己有什么帮助？
学会闭包的高级用法，以后用在业务代码里，让自己的代码变得高级。 4.哪些知识点可迁移？
闭包，深入优化方案。 5.代码链接
https://github.com/quyapeng/mini-react-learn
欢迎 star

1.学到了什么？
useEffect 实现 2.遇到问题？
暂无 3.这节课对自己有什么帮助？
更深的理解 effect 的使用方法，也能从每次使用中理解到背后的原理 4.哪些知识点可迁移？
其他方法是不是实现方式都差不多。 5.代码链接
https://github.com/quyapeng/mini-react-learn
欢迎 star

1.学到了什么？
业务结合课程，实现增删改查 2.遇到问题？
优化还需要加强思考，考虑哪些能独立出来，有利于理解，有利于业务，也有利于代码维护性。 3.这节课对自己有什么帮助？
深入理解，独立实现功能。 4.哪些知识点可迁移？
完全结合课程来独立思考独立完成 todolist 的功能。 5.代码链接
https://github.com/quyapeng/mini-react-learn
欢迎 star

1.优化?
