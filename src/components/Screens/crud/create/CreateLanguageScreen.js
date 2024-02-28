import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { CreateLanguage } from 'src/components/Pages/language/CreateLanguage'

export const CreateLanguageScreen = () => {
  return (
    <DashboardTemplate>
      <CreateLanguage />
    </DashboardTemplate>
  )
}
