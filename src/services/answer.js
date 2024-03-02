import { apiClient } from "src/http-commons";

export const GetAnswers = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/answer/get-answers', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}

export const CreateAnswer = (payload) => {
  let params = {
    question_id: Number(payload.question_id),
    name: payload.name,
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/answer/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const UpdateAnswer = (payload) => {
  let params = {
    question_id: Number(payload.question_id),
    is_correct: payload.is_correct,
    name: payload.name
  }
  
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.patch(`/answer/${payload.answer_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const RemoveAnswer = (payload) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.delete(`/answer/${payload.answer_id}`, { headers }).then(res => {
    return res.data
  })
  return result
}