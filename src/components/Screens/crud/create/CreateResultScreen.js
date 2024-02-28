import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { CreateResult } from 'src/components/Pages/result/CreateResult'

export const CreateResultScreen = () => {
  return (
    <DashboardTemplate>
      <CreateResult />
    </DashboardTemplate>
  )
}
