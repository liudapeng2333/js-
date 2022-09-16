const arr = [1, 2, 3, 1, 3, 5, 5, 5, 5, 5, 5];


function removeDuplicates(arr) {
  arr.sort()
  for (let i = 1; i < arr.length; ) {
    if(arr[i] === arr[i-1]) {
      arr.splice(i, 1)
    } else {
      i++
    }
  }
}

removeDuplicates(arr)

console.log(arr)



