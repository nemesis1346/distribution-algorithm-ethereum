process.on('message',async function(){
    const data = process.argv.slice(2);
    console.log(data[0]);
    let promise = data[0];
    console.log(promise);
        process.send('HOla');
});