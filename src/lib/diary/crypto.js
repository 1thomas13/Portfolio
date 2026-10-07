// Plain JS (not TS) so scripts/diary-download.mjs can import it too
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"

const PREFIX = "diary:v1:"

/** @param {string | undefined} base64 */
export function parseKey(base64) {
  const key = Buffer.from(base64 ?? "", "base64")
  if (key.length !== 32) throw new Error("DIARY_KEY tiene que ser una clave de 32 bytes en base64.")
  return key
}

/** @param {string} text @param {Buffer} key */
export function encrypt(text, key) {
  const iv = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", key, iv)
  const data = Buffer.concat([cipher.update(text, "utf8"), cipher.final()])
  return `${PREFIX}${Buffer.concat([iv, cipher.getAuthTag(), data]).toString("base64")}\n`
}

/** @param {string} payload @param {Buffer} key */
export function decrypt(payload, key) {
  const raw = Buffer.from(payload.trim().slice(PREFIX.length), "base64")
  const decipher = createDecipheriv("aes-256-gcm", key, raw.subarray(0, 12))
  decipher.setAuthTag(raw.subarray(12, 28))
  return Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8")
}
