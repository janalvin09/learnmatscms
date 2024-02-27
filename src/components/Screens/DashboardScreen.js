import React from 'react'
import { DashboardTemplate } from 'src/templates/DashboardTemplate'
import { Dashboard } from '../Pages/Dashboard'
import { PanelHeader } from '../Partial/PanelHeader'

export const DashboardScreen = () => {
  return (
    <DashboardTemplate>
      <div className='flex flex-col w-full m-4'>
        <PanelHeader />
        <Dashboard />  
      </div>
    </DashboardTemplate>
  )
}
