let taskId = 1;
function workLoop(deadline) {
  console.log(deadline.timeRemaining());
  taskId++;
  let shouldYield = false;
  while (!shouldYield) {
    // 执行任务
    console.log(`taskId: ${taskId}`);
    shouldYield = deadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
