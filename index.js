const { deterministicPartitionKey } = require("./dpk");

console.log(deterministicPartitionKey());
console.log(deterministicPartitionKey("'hello'"));
console.log(deterministicPartitionKey({ partitionKey: "world" }));
