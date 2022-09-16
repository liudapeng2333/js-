// 将数组转换为树结构
function listToTree(list, parentId) {
  const target = [];
  for (const node of list) {
    if (node.pid === parentId) {
      let children = listToTree(list, node.id);
      if (children.length) {
        node.children = children;
      }
      target.push(node);
    }
  }
  return target;
}
function mapListToTree(list) {
  const target = [];
  const mp = {}
  for (const node of list) {
    mp[node.id] = node
    mp[node.id].children = []
  }
  for (const node of list) {
    if (node.pid !== null) {
      mp[node.pid].children.push(node)
    } else {
      target.push(node);
    }
  }
  return target;
}

let list = [
  { id: 1, pid: "-1" },
  { id: 11, pid: "1" },
  { id: 12, pid: "1" },
  { id: 121, pid: "12" },
];

let citys = [
  { pid: null, id: "1", name: "杭州市" },
  { pid: "1", id: "1-1", name: "滨江区" },
  { pid: "1", id: "1-2", name: "萧山区" },
  { pid: "1-1", id: "1-1-1", name: "西兴街道" },
  { pid: "1-2", id: "1-2-1", name: "蜀山街道" },
];

let res = listToTree(citys, null);

let ans = mapListToTree(citys);
console.log(ans[0]);

// 将树结构转换为数组
function treeToList(tree) {
  const list = [];
  let queue = [];
  queue.push(tree);
  while (queue.length) {
    const parentNode = queue.shift();
    if (parentNode.children) {
      queue = queue.concat(parentNode.children);
      delete parentNode.children;
    }
    list.push(parentNode);
  }
  return list;
}

// console.log(treeToList(res[0]));
