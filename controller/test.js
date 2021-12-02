const input = [1, 2, 3, 3, 4, 5,2, 6,3,6,1];

function removeDuplicate(arr) {
    const result = [];
    const tmp = {};

    for (let i = 0; i < arr.length; i++) {
        if (!tmp[arr[i]]) {
            tmp[arr[i]] = 12
            result.push(arr[i]);
        }
        
        // if (!tmp[arr[i]]) {
        //     tmp[arr[i]] = 12
         
        // }else result.push(arr[i]);

        //
        // if (tmp[arr[i]]) {
        //     result.push(arr[i]);
        // } else tmp[arr[i]] = 12
    }
    return result;
}

console.log(removeDuplicate(input));

// console.log([...new Set(input)])