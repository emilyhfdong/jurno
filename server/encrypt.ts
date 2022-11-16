import crypto from "crypto"

const ALGORITHM = "aes-256-cbc"

const getKeys = () => {
  const initVectorStr = process.env.INIT_VECTOR
  const securityKeyStr = process.env.SECURITY_KEY
  if (!initVectorStr || !securityKeyStr) {
    throw new Error("Missing env vars `INIT_VECTOR` and `SECURITY_KEY`")
  }
  return {
    initVector: Buffer.from(initVectorStr, "hex"),
    securityKey: Buffer.from(securityKeyStr, "hex"),
  }
}

export const encrypt = (text: string) => {
  const { initVector, securityKey } = getKeys()

  const cipher = crypto.createCipheriv(ALGORITHM, securityKey, initVector)
  let encryptedData = cipher.update(text, "utf-8", "hex")
  encryptedData += cipher.final("hex")
  return encryptedData
}

export const decrypt = (text: string) => {
  const { initVector, securityKey } = getKeys()
  const decipher = crypto.createDecipheriv(ALGORITHM, securityKey, initVector)
  let decryptedData = decipher.update(text, "hex", "utf-8")
  decryptedData += decipher.final("utf8")
  return decryptedData
}
