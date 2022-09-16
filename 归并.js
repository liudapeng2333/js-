var arr = [2,4,5,6,1]


let count = 0
var temp = new Array(arr.length).fill(0)
function mergeSort(arr, l, r) {
  if (l >= r)
    return

  let mid = Math.floor((l + r) / 2)
  mergeSort(arr, l, mid)
  mergeSort(arr, mid + 1, r)

  let i = l, j = mid + 1, k = 0
  while(i <= mid && j <= r) {
    if (arr[i] <= arr[j]) temp[k++] = arr[i++]
    else{ 
      temp[k++] = arr[j++]
      // 逆序对数量
      count += mid - i + 1
    }
  }
  while (i <= mid) {
    temp[k++] = arr[i++]
  }
  while (j <= r) {
    temp[k++] = arr[j++]
  }

  i = l, k = 0
  while (i <= r) {
    arr[i++] = temp[k++]
  }
}

mergeSort(arr, 0, arr.length - 1)

console.log(arr);

console.log(count);







