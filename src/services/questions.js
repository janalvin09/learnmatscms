import { apiClient } from "src/http-commons";


export const GetQuestions = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/question/get-questions', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}

export const CreateQuestion = (payload) => {
  let params = {
    classlevel_id: Number(payload.classlevel_id),
    material_id: Number(payload.material_id),
    name: payload.name,
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/question/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const UpdateQuestion = (payload) => {
  let params = {
    classlevel_id: Number(payload.classlevel_id),
    material_id: Number(payload.material_id),
    name: payload.name,

  }
  
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.patch(`/question/${payload.question_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const RemoveQuestion = (payload) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.delete(`/question/${payload.question_id}`, { headers }).then(res => {
    return res.data
  })
  return result
}