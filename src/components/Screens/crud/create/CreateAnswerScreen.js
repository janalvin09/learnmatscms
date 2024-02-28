import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { CreateAnswer } from 'src/components/Pages/answer/CreateAnswer'

export const CreateAnswerScreen = () => {
  return (
    <DashboardTemplate>
      <CreateAnswer />
    </DashboardTemplate>
  )
}
