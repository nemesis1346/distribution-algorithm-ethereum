function onlyUnique(value, index, self) { 
    console.log(value);
    return value.emiterId === index;
}

let receiptList = [{"emiterId":20},{"emiterId":20},{"emiterId":200}];

var flags = {};
var filteredArray = receiptList.filter(function(entry) {
    if (flags[entry.emiterId]) {
        return false;
    }
    flags[entry.emiterId] = true;
    return true;
});

console.log(filteredArray);