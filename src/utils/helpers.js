import { AES, enc } from "crypto-js";
import dayjs from 'dayjs'
import _ from "lodash";

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

export const is_hasMaterial = (materials, classlevel_id) => {
  return _.findIndex(materials, (material) => { return material.classlevel_id === classlevel_id })
}

export const is_hasQuestion = (questions, material_id) => {
  return _.findIndex(questions, (question) => { return question.material_id === material_id })
}

export const is_hasAnswer = (answers, question_id) => {
  return _.findIndex(answers, (answer) =>  { return answer.question_id === question_id })
}

export const is_hasTranslation = (translations, language_id) => {
  return _.findIndex(translations, (translation) => { return translation.language_id === language_id })
}