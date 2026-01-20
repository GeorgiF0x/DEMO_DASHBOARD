"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { RecentIncidents } from "@/components/dashboard/recent-incidents"
import { CallsChart } from "@/components/dashboard/calls-chart"
import { PipelineStatus } from "@/components/dashboard/pipeline-status"
import { WorkshopStatus } from "@/components/dashboard/workshop-status"
import { LiveActivity } from "@/components/dashboard/live-activity"
import { incidents, getKPIs } from "@/lib/mock-data"

export default function DashboardPage() {
  const kpis = getKPIs()

  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
        <KPICards kpis={kpis} />

        <PipelineStatus />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RecentIncidents incidents={incidents} />
          <WorkshopStatus />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CallsChart />
          <LiveActivity />
        </div>
      </div>
    </>
  )
}
