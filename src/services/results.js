import { apiClient } from "src/http-commons";


export const GetAllUsers = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/users/get-users', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}

export const GetResults = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/result/get-all-results', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}