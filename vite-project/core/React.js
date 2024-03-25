function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  //
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };

  root = nextWorkOfUnit;
}

let root = null;

let nextWorkOfUnit = null;
function workLoop(deadline) {
  // console.log(deadline.timeRemaining());

  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    // 执行任务
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextWorkOfUnit && root) {
    // 链表处理结束
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function commitRoot() {
  commitWork(root.child);
  root = null;
}

function commitWork(fiber) {
  if (!fiber) return;
  fiber.parent.dom.append(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    // 只处理非children的props
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}

function initChildren(fiber) {
  const children = fiber.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });
}
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    //1.创建dom
    const dom = (fiber.dom = createDom(fiber.type));
    // const dom = (work.dom =
    //   work.type === "TEXT_ELEMENT"
    //     ? document.createTextNode("")
    //     : document.createElement(work.type));

    fiber.parent.dom.append(dom);
    //2.设置props
    updateProps(dom, fiber.props);
  }

  //3.转换为链表，设置好指针
  initChildren(fiber);

  // const children = work.props.children;
  // let prevChild = null;
  // children.forEach((child, index) => {
  //   const newWork = {
  //     type: child.type,
  //     props: child.props,
  //     child: null,
  //     parent: work,
  //     sibling: null,
  //     dom: null,
  //   };
  //   if (index === 0) {
  //     work.child = newWork;
  //   } else {
  //     prevChild.sibling = newWork;
  //   }
  //   prevChild = newWork;
  // });
  //4.返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child;
  }

  if (fiber.sibling) {
    return fiber.sibling;
  }

  return fiber.parent?.sibling;
}

requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
};

export default React;
