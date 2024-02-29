import { AES, enc } from "crypto-js";
import dayjs from 'dayjs'

export const EncryptUser = ( user ) => {
  const encryptedUser = AES.encrypt(JSON.stringify({ ...user }), "user").toString()
  return encryptedUser
}

export const getDecryptedUser = ( user ) => {
  const decryptedUser = AES.decrypt(user, "user").toString(enc.Utf8)
  const userdata = JSON.parse(decryptedUser)

  return userdata
}

export const encodeURL = (value) => {
  return encodeURIComponent(JSON.stringify(value))
}

export const decodeURL = (value) => {
  return JSON.parse(decodeURIComponent(value))
}

export const UtcDateFormatter = (date) => {
  return `${dayjs(date).format("YYYY")}, ${dayjs(date).format("MMMM")} ${dayjs(date).format("DD")}`
  
}