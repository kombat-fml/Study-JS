const num = 266219;
let product = 1;
for (let i = 0; i < num.toString().length; i++) {
  product *= num.toString()[i];
}

let res = product ** 3;
console.log(res.toString().substr(0, 2));
