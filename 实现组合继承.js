function People(name) {
  this.name = name;
  this.body = ["head", "hair", "eye", "nose", "mouse"];
}

People.prototype.sleep = function () {
  console.log("我是People休息方法");
};

function Student(name, age) {
  People.call(this, name);
  this.age = age;
}

Student.prototype = new People();

Student.prototype.eat = function () {
  console.log("我是Student吃饭方法");
};

let s1 = new Student("bob", 18);
let p1 = new People("jerry");
s1.body = ["head"];

s1.sleep();

console.log(s1);
console.log(s1.body);
console.log(p1.body);
