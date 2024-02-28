import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { CreateClassLevel } from 'src/components/Pages/classlevel/CreateClassLevel'

export const CreateClassLevelScreen = () => {
  return (
    <DashboardTemplate>
      <CreateClassLevel />
    </DashboardTemplate>
  )
}
