console.log('starting app')
setTimeout(() => {    console.log('inside 2 callback')    }, 2000)
setTimeout(() => {    console.log('inside 0 callback')    }, 0)
console.log('finisihng up')