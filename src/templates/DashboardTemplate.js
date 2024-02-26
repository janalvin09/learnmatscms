import { SideNav } from "src/routes/SideNav"

export const DashboardTemplate = ({ children }) => {
  return (
    <div className="dashboard_template_main bg-white min-h-screen w-screen flex">
      <SideNav />
      {children}
    </div>
  )
}