import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { CreateTranslation } from 'src/components/Pages/translation/CreateTranslation'

export const CreateTranslationScreen = () => {
  return (
    <DashboardTemplate>
      <CreateTranslation />
    </DashboardTemplate>
  )
}
