const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");
const hash = (value) =>
  crypto.createHash("sha3-512").update(value).digest("hex");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns hashed string when the input doesn't have partition key", () => {
    const event = "hello";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(hash(JSON.stringify(event)));
  });

  it("Returns hashed string when the input has partition key which is shorter than 256", () => {
    const event = { partitionKey: "hello" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns hashed string when the input has partition key which is longer than 256", () => {
    const event = {
      partitionKey:
        "hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world!",
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(hash(event.partitionKey));
  });
});
