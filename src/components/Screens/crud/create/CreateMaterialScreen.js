import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { CreateMaterial } from 'src/components/Pages/material/CreateMaterial'

export const CreateMaterialScreen = () => {
  return (
    <DashboardTemplate>
      <CreateMaterial />
    </DashboardTemplate>
  )
}
