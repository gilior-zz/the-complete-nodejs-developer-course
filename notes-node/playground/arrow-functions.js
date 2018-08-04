// var square = (x) => {
//     var res = x * x;
//     return res;
// }

// var square = (x) => x * x;
var square = x => x * x;
console.log(square(9));

var user = {
    name: 'lior',
    sayHi: () => {
        console.log(`Hi Im ${this.name}`)
    },
    sayHiAlt() {
        console.log(arguments)
        console.log(`Hi Im ${this.name}`)
    }
}

user.sayHi();
user.sayHiAlt();