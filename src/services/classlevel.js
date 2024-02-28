import { apiClient } from "src/http-commons";

export const GetClassLevel = () => {
  const result  = apiClient.get('/classlevel/all').then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}