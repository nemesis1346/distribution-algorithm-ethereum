const cp = require('child_process');
const { promisifyChildProcess } = require('promisify-child-process');
const Example1 = require('./example1-old-form.js');

// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
// const fork = cp.fork('./example1-performance.js');
// fork.send('this is an input');
// fork.send('this is an input');
// fork.send('this is an input');
// fork.send('this is an input');

// fork.on('message',function(result){
//     console.log(result);
// });


async function main() {
    try {
        this.example1 = new Example1();
        console.log(this.example1);
        promisifyChildProcess(this.example1.executeExample1(), 'test');
        promisifyChildProcess(this.example1.executeExample1(), 'test');
        promisifyChildProcess(this.example1.executeExample1(), 'test');
        promisifyChildProcess(this.example1.executeExample1(), 'test');

    } catch (e) {
        console.log(e);
    }
}

main();