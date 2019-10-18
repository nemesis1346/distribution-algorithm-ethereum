function parseResponse(response){
    let body = JSON.parse(response);
    if (body.status == '200') {
        return body.data;
    } else {
        return body.message;
    }
}
module.exports.parseResponse =parseResponse;

//  MORE EFFICIENT, BUT LESS FUN
/**
 * @description Remove duplicates from an array of objects in javascript
 * @param arr - Array of objects
 * @param prop - Property of each object to compare
 * @returns {Array}
 */
function removeDuplicatesProp(arr, prop){
    let obj = {};
    return Object.keys(arr.reduce((prev, next) => {
        if (!obj[next[prop]]) obj[next[prop]] = next;
        return obj;
    }, obj)).map((i) => obj[i]);
}
module.exports.removeDuplicatesProp=removeDuplicatesProp;

function parseContent(content){
    // console.log(content);
    let entireContent = content;
    let finalResult = [];

    //Processing for the entire sentence
    for (let index = 0; index <= entireContent.length; index++) {
        for (let j = index; j <= entireContent.length; j++) {
            const currentResult = entireContent.slice(index, j).trim();
            if (currentResult) {
                finalResult.push(currentResult.toLowerCase());
            }
        }
    }
    finalResult = this.removeDuplicates(finalResult);
    return finalResult;
}
module.exports.parseContent=parseContent;

/**
 * @description Remove duplicates
 */
function removeDuplicates(arr){
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i])
        }
    }
    return unique_array
}
module.exports.removeDuplicates = removeDuplicates;

function removeDuplicates2(myArr, prop){
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}
module.exports.removeDuplicates2=removeDuplicates2;

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 module.exports.makeid= makeid;

 function getRandomItem(items){
    let result = items[Math.floor(Math.random()*items.length)];
    return result;
 }
 module.exports.getRandomItem = getRandomItem;