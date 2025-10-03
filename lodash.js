// const lodash = require("lodash");
const _ = require("lodash");

// const obj = { name: "1", age: 2, created: 3 };
// const pickObj = lodash.pick(obj, ["a", "b"]);

// const arr = ["a", "b", "c"];
// const joinArr = _.join(arr, " - ");

const array = [1, 2, undefined, 3, 4, undefined];
_.pull(array, undefined);
_.remove(array, (n) => n % 2 === 0);



