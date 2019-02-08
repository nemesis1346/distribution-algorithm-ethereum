const cp = require('child_process');
const { promisifyChildProcess } = require('promisify-child-process');
const Example1 = require('./example1-old-form.js');

const util = require('util');
//const exec = util.promisify(require('child_process').exec);

// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
// cp.fork('./example1-performance.js',['example1']);
const fork = cp.fork('./example1-child-process-form.js');
fork.send('this is an input');
fork.send('this is an input');
fork.send('this is an input');
fork.send('this is an input');
fork.send('this is an input');
fork.send('this is an input');
fork.send('this is an input');
fork.send('this is an input');
fork.on('message',function(result){
    console.log();
    console.log(result);
});


// async function main() {
//     try {
//         let instance = new Example1();
//         // console.log(this.example1);
//         // promisifyChildProcess(this.example1.executeExample1(), 'test');
//         // promisifyChildProcess(this.example1.executeExample1(), 'test');
//         // promisifyChildProcess(this.example1.executeExample1(), 'test');
//          promisifyChildProcess(instance.example1()).then(()=>{
//              console.log('--------HELLO--------');
//          });

//       //  await exec(instance.example1());
//     } catch (e) {
//         console.log(e);
//     }
// }

// main();