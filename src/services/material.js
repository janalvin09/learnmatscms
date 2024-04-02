import { apiClient } from "src/http-commons";


export const GetMaterial = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/material/get-materials', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}

export const CreateMaterial = (payload) => {
  let params = {
    classlevel_id: Number(payload.classlevel_id),
    category_id: Number(payload.category_id),
    name: payload.name,
    material_icon: payload.material_icon,
    material_description_title: payload.material_description_title,
    material_description: payload.material_description,
    material_description_image: payload.material_description_image
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.post('/material/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const UpdateMaterial = (payload) => {
  let params = {
    classlevel_id: Number(payload.classlevel_id),
    category_id: Number(payload.category_id),
    name: payload.name,
    material_icon: payload.material_icon,
    material_description_title: payload.material_description_title,
    material_description: payload.material_description,
    material_description_image: payload.material_description_image
  }
  
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.patch(`/material/${payload.material_id}`, params, { headers }).then(res => {
    return res.data
  })
  return result
}

export const RemoveMaterial = (payload) => {
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }
  const result = apiClient.delete(`/material/${payload.material_id}`, { headers }).then(res => {
    return res.data
  })
  return result
}