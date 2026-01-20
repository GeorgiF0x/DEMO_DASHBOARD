"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Wrench,
  Calendar
} from "lucide-react"
import { motion } from "framer-motion"

interface KPICardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
}

function KPICard({ title, value, description, icon, trend, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {trend && (
              <span className={`flex items-center gap-0.5 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend.value}%
              </span>
            )}
            <span>{description}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface KPICardsProps {
  kpis: {
    totalIncidents: number
    activeIncidents: number
    resolvedToday: number
    avgResponseTime: number
    workshopsActive: number
    pendingAppointments: number
    callsProcessedToday: number
    successRate: number
  }
}

export function KPICards({ kpis }: KPICardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Llamadas Procesadas Hoy"
        value={kpis.callsProcessedToday}
        description="llamadas recibidas"
        icon={<Phone className="h-4 w-4" />}
        trend={{ value: 12, isPositive: true }}
        delay={0}
      />
      <KPICard
        title="Incidentes Activos"
        value={kpis.activeIncidents}
        description="en proceso"
        icon={<AlertTriangle className="h-4 w-4" />}
        trend={{ value: 8, isPositive: false }}
        delay={0.1}
      />
      <KPICard
        title="Tiempo de Respuesta"
        value={`${kpis.avgResponseTime} min`}
        description="promedio hoy"
        icon={<Clock className="h-4 w-4" />}
        trend={{ value: 5, isPositive: true }}
        delay={0.2}
      />
      <KPICard
        title="Tasa de Éxito"
        value={`${kpis.successRate}%`}
        description="incidentes resueltos"
        icon={<CheckCircle className="h-4 w-4" />}
        trend={{ value: 2.5, isPositive: true }}
        delay={0.3}
      />
    </div>
  )
}
