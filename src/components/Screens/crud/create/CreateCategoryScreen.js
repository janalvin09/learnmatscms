import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { CreateCategory } from 'src/components/Pages/category/CreateCategory'

export const CreateCategoryScreen = () => {
  return (
    <DashboardTemplate>
      <CreateCategory />
    </DashboardTemplate>
  )
}
