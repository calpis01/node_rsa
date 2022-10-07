var fs = require('fs');
var array = fs.readFileSync('file2.txt').toString().split(",");
let Array = [];
for(i in array) {
    Array.push(array[i]);
}
console.log(Array.length);
