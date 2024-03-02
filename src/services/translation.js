import { apiClient } from "src/http-commons";


export const GetTranslations = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/translation/get-translations', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}

export const CreateTranslation = (payload) => {
  let params = {
    language_id: Number(payload.language_id),
    word: payload.word,
    translation: payload.translation
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/translation/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const UpdateTranslation = (payload) => {
  let params = {
    language_id: Number(payload.language_id),
    word: payload.word,
    translation: payload.translation
  }
  
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.patch(`/translation/${payload.translation_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const RemoveTranslation = (payload) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.delete(`/translation/${payload.translation_id}`, { headers }).then(res => {
    return res.data
  })
  return result
}