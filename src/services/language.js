import { apiClient } from "src/http-commons";


export const GetLanguages = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/language/get-languages', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}

export const CreateLanguage = (payload) => {
  let params = {
    lang_code: payload.lang_code,
    name: payload.name
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/language/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const UpdateLanguage = (payload) => {
  let params = {
    lang_code: payload.lang_code,
    name: payload.name
  }
  
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.patch(`/language/${payload.language_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const RemoveLanguage = (payload) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.delete(`/language/${payload.language_id}`, { headers }).then(res => {
    return res.data
  })
  return result
}