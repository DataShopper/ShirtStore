const arr = 'str, arr the, cat'
const arr2 = arr.replace(/,/g, '').split(' ')
const arr3 = arr2.join(', ')
const arr4 = arr3.split(', ')

console.log(arr4)
console.log(Array.isArray(arr4))
