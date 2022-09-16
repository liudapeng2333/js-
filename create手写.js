function myCreate(obj) {
  const Fn = function() {}
  Fn.prototype = obj
  return new Fn()
}


const user = {
  name: 'IU',
  age: 18,
  friend: {
    name: 'Lay',
    age: 20
  }
}

const me = myCreate(user)

me.friend.name = 'D.O'

console.log(me.friend.name) // "D.O"
console.log(user.friend.name) // "D.O"


