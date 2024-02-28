import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { CreateQuestion } from 'src/components/Pages/question/CreateQuestion'

export const CreateQuestionScreen = () => {
  return (
    <DashboardTemplate>
      <CreateQuestion />
    </DashboardTemplate>
  )
}
