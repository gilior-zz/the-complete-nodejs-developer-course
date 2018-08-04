var asyncAdd = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number')
                res(a + b)
            else rej('nubers idiot')
        }, 2000)
    })
}

asyncAdd(4, 5).then((res) => {
    console.log('res is ', res);
    return asyncAdd(res, 33)
})
    .then(res => console.log('res is ', res))
    .catch(err=>console.log(err))

// var v = new Promise((res, rej) => {
//     setTimeout(() => {
//         // res('gooooood ')
//         rej('gooooood ')
//     }, 2000)
//
// })
//
// v.then((str) => {
//     console.log('god', str)
// }, (err) => {
//     console.log('err', err)
// })