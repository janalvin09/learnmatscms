import { AES, enc } from "crypto-js";

export const EncryptUser = ( user ) => {
  const encryptedUser = AES.encrypt(JSON.stringify({ ...user }), "user").toString()
  return encryptedUser
}

export const getDecryptedUser = ( user ) => {
  const decryptedUser = AES.decrypt(user, "user").toString(enc.Utf8)
  const userdata = JSON.parse(decryptedUser)

  return userdata
}