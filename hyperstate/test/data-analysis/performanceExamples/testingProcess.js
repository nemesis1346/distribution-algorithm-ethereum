const cp  = require('child_process');


// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
const fork = cp.fork('./example1-performance.js');
fork.send('this is an input');

fork.on('message',function(result){
    console.log(result);
});

