import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { ViewResult } from 'src/components/Pages/result/ViewResult'

export const ViewResultsScreen = () => {
  return (
    <DashboardTemplate>
      <ViewResult />
    </DashboardTemplate>
  )
}
