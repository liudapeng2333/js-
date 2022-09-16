var arr = [2,4,5,6,1]

function quickSort(arr, left, right) {
  // 返回边界
  if (right <= left)
    return
  
  let l = left - 1, r = right + 1
  let mid = Math.floor((left + right) / 2)
  while (l < r) {
    do {
      l++
    } while (arr[l] < arr[mid])
    do {
      r--
    } while (arr[r] > arr[mid])
    if (l < r) {
      [arr[l], arr[r]] = [arr[r], arr[l]]
    }
  }

  quickSort(arr, left, r)
  quickSort(arr, r + 1, right)
}

quickSort(arr, 0, arr.length - 1)


console.log(arr)






