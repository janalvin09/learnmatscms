import { apiClient } from "src/http-commons";


export const Login = (payload) => {
  const result = apiClient.post('auth/signin', payload).then(res => {
    return res.data
  })

  return result
}

export const GetUser = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }
    const result  = apiClient.get('/users/me', { headers }).then(res => {
      return res.data
    }).catch(err => {
      return err.response.data
    })

    return result
}