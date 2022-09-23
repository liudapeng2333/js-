let obj = {
  name: "lily",
  age: 90,
};
let str2 = "${obj.name}的年龄是${obj.age}";

function replacefunc(desc) {
  return desc.replace(/\$\{([^}]*)\}/g, function (match, key) {
    console.log(match); // ${obj.name} || ${obj.age}
    console.log(key); // obj.name || obj.age
    console.log(eval(key)); // lily || 90
    return eval(key);
  });
}
console.log(replacefunc(str2));

function stringModel(str) {
  return str.replace(/\$\{([^\}]*)\}/g, function (match, key) {
    return eval(key);
  });
}

console.log(stringModel(str2));
