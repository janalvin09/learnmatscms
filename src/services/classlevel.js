import { apiClient } from "src/http-commons";

export const GetClassLevel = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/classlevel/all', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}

export const CreateClasslevel = (payload) => {
  let params = {
    name: payload.name
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/classlevel/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const UpdateClasslevel = (payload) => {
  let params = {
    name: payload.name
  }
  
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.patch(`/classlevel/${payload.classlevel_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const RemoveClasslevel = (payload) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.delete(`/classlevel/${payload.classlevel_id}`, { headers }).then(res => {
    return res.data
  })
  return result
}