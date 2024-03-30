import { apiClient } from "src/http-commons";


export const GetCategory = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/category/get-categories', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}

export const CreateCategory = (payload) => {
  let params = {
    classlevel_id: Number(payload.classlevel_id),
    name: payload.name,
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/category/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const UpdateCategory = (payload) => {
  let params = {
    classlevel_id: Number(payload.classlevel_id),
    name: payload.name,
  }
  
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.patch(`/category/${payload.category_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const RemoveCategory = (payload) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.delete(`/category/${payload.category_id}`, { headers }).then(res => {
    return res.data
  })
  return result
}