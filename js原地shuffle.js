
let arr = [1,2,3,4,5,6]

// 方法1
// arr.sort(() => {
//   return 0.5 - Math.random()
// })

// 或者使用O（n）时间复杂度
function shuffle(arr) {
  let l = arr.length
  while(l) {
    let random = Math.floor(Math.random() * l)
    l--
    let temp = arr[random]
    arr[random] = arr[l]
    arr[l] = temp
  }
}

shuffle(arr)
console.log(arr)