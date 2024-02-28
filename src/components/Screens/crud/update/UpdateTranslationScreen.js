import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { UpdateTranslation } from 'src/components/Pages/translation/UpdateTranslation'

export const UpdateTranslationScreen = () => {
  return (
    <DashboardTemplate>
      <UpdateTranslation />
    </DashboardTemplate>
  )
}
