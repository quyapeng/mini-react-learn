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
        const isTextNode =
          typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  //
  wipRoot = {
    dom: container,
    props: {
      children: [el],
    },
  };
  nextWorkOfUnit = wipRoot;
}
// work in progress
let wipRoot = null;
let currentRoot = null;
let wipFiber = null;
let nextWorkOfUnit = null;

let deletions = [];
function workLoop(deadline) {
  // console.log(deadline.timeRemaining());

  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    // 执行任务
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);

    if (wipRoot?.sibling?.type === nextWorkOfUnit?.type) {
      console.log("hit", wipRoot, nextWorkOfUnit);
      nextWorkOfUnit = undefined;
    }

    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextWorkOfUnit && wipRoot) {
    // 链表处理结束
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function commitRoot() {
  deletions.forEach(commitDeletion);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
  deletions = [];
}

function commitDeletion(fiber) {
  if (fiber.dom) {
    let fiberParent = fiber.parent;
    while (!fiberParent.dom) {
      fiberParent = fiberParent.parent;
    }
    fiberParent.dom.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child);
  }
}
function commitWork(fiber) {
  if (!fiber) return;

  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }
  if (fiber.effectTag == "update") {
    // update
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props);
  } else if (fiber.effectTag == "placement") {
    if (fiber.dom) {
      fiberParent.dom.append(fiber.dom);
    }
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(dom, nextProps, prevProps) {
  // Object.keys(nextProps).forEach((key) => {
  //   // 只处理非children的props
  //   if (key !== "children") {
  //     if (key.startsWith("on")) {
  //       //
  //       const event = key.slice(2).toLowerCase();
  //       dom.addEventListener(event, nextProps[key]);
  //     } else {
  //       dom[key] = nextProps[key];
  //     }
  //   }
  // });
  Object.keys(prevProps).forEach((key) => {
    if (key !== "children") {
      if (!(key in nextProps)) {
        dom.removeAttribute(key);
      }
    }
  });

  Object.keys(nextProps).forEach((key) => {
    // 只处理非children的props
    if (key !== "children") {
      if (nextProps[key] !== prevProps[key]) {
        if (key.startsWith("on")) {
          const eventType = key.slice(2).toLowerCase();

          dom.removeEventListener(eventType, prevProps[key]);
          dom.addEventListener(eventType, nextProps[key]);
        } else {
          dom[key] = nextProps[key];
        }
      }
    }
  });
}

function reconcileChildren(fiber, children) {
  let oldFiber = fiber.alternate?.child;
  let prevChild = null;
  children.forEach((child, index) => {
    const isSameType = oldFiber && oldFiber.type === child.type;
    let newFiber;
    if (isSameType) {
      // isSameType
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: oldFiber.dom,
        effectTag: "update",
        alternate: oldFiber,
      };
    } else {
      if (child) {
        newFiber = {
          type: child.type,
          props: child.props,
          child: null,
          parent: fiber,
          sibling: null,
          dom: null,
          effectTag: "placement",
        };
      }
      if (oldFiber) {
        deletions.push(oldFiber);
      }
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    if (newFiber) {
      prevChild = newFiber;
    }
  });
  // if (oldFiber) {
  //   deletions.push(oldFiber);
  // }
  while (oldFiber) {
    deletions.push(oldFiber);
    oldFiber = oldFiber.sibling;
  }
}

// function updateFunctionComponent(fiber) {
//   //   if (!fiber.dom) {
//   //     const dom = (fiber.dom = createDom(fiber.type));

//   //     updateProps(dom, fiber.props);
//   //   }
//   const children = [fiber.type(fiber.props)];
//   initChildren(fiber, children);
// }
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  const children = [fiber.type(fiber.props)];

  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type));
    updateProps(dom, fiber.props, {});
  }
  const children = fiber.props.children;
  reconcileChildren(fiber, children);
}

function performUnitOfWork(fiber) {
  const isFunctionComponent = typeof fiber.type === "function";
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  // const isFunctionComponent = typeof fiber.type === "function";
  // if (!isFunctionComponent) {
  //   if (!fiber.dom) {
  //     //1.创建dom
  //     const dom = (fiber.dom = createDom(fiber.type));
  //     // const dom = (work.dom =
  //     //   work.type === "TEXT_ELEMENT"
  //     //     ? document.createTextNode("")
  //     //     : document.createElement(work.type));

  //     //fiber.parent.dom.append(dom);
  //     //2.设置props
  //     updateProps(dom, fiber.props);
  //   }
  // }

  //3.转换为链表，设置好指针
  // const children = isFunctionComponent
  //   ? [fiber.type(fiber.props)]
  //   : fiber.props.children;
  // initChildren(fiber, children);

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

  // while
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
  // return fiber.parent?.sibling;
}

requestIdleCallback(workLoop);
//
function update() {
  //
  // console.log("wipFiber", wipFiber);

  let currentFiber = wipFiber;
  return () => {
    console.log(currentFiber);
    wipFiber = {
      ...currentFiber,
      alternate: currentFiber,
    };
    // wipRoot = {
    //   dom: currentRoot.dom,
    //   props: currentRoot.props,
    //   alternate: currentRoot,
    // };

    nextWorkOfUnit = wipRoot;
  };
}

const React = {
  update,
  render,
  createElement,
};

export default React;
