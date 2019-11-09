export const parseResponse = (response) => {
    console.log('PARSING RESPONSE');
    console.log(response);
    if (response.status === 200
        && response.data
        && response.data.body) {
        return {
            "data":response.data.body,
        };
    }  else {
        console.log('UNKNOWN RESPONSE ERROR');
        console.log(response);
    }
}

/**
 * @description Remove duplicates from an array of objects in javascript
 * @param arr - Array of objects
 * @param prop - Property of each object to compare
 * @returns {Array}
 */
export const removeDuplicatesProp = (arr, prop) => {
    let obj = {};
    return Object.keys(arr.reduce((prev, next) => {
        if (!obj[next[prop]]) obj[next[prop]] = next;
        return obj;
    }, obj)).map((i) => obj[i]);
}


/**
 * @description Remove duplicates
 */
export const removeDuplicates = (arr) => {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

