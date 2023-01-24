const crypto = require("crypto")

const isTrivial = (event) => !event
const hasPartitionKey = (event) => event.partitionKey
const makePartitionKey = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex")

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0"
  const MAX_PARTITION_KEY_LENGTH = 256
  let candidate

  if (isTrivial(event)) {
    return TRIVIAL_PARTITION_KEY
  }

  candidate = hasPartitionKey(event)
    ? event.partitionKey
    : makePartitionKey(JSON.stringify(event))

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate)
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? makePartitionKey(candidate)
    : candidate
}
