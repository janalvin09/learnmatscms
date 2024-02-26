import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { Question } from '../Pages/Question'

export const QuestionScreen = () => {
  return (
    <DashboardTemplate>
      <Question />
    </DashboardTemplate>
  )
}
