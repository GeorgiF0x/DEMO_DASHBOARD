"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  ResponsiveContainer
} from "recharts"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Phone,
  Clock,
  CheckCircle,
  Users
} from "lucide-react"
import {
  callsPerDayData,
  incidentsByTypeData,
  responseTimeData,
  workshops,
  incidents
} from "@/lib/mock-data"

const chartConfig = {
  calls: {
    label: "Llamadas",
    color: "hsl(var(--chart-1))",
  },
  resolved: {
    label: "Resueltos",
    color: "hsl(var(--chart-2))",
  },
  time: {
    label: "Tiempo (min)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const COLORS = ['#FF8A00', '#FFB366', '#CC6E00', '#FF9F33', '#E67A00']

// Workshop performance data
const workshopPerformance = workshops.map(w => ({
  name: w.name.split(' ').slice(0, 2).join(' '),
  rating: w.rating,
  responseTime: w.responseTime,
  incidents: w.activeIncidents
}))

// Monthly trend data
const monthlyTrend = [
  { month: "Ago", incidents: 145, resolved: 138 },
  { month: "Sep", incidents: 162, resolved: 155 },
  { month: "Oct", incidents: 178, resolved: 170 },
  { month: "Nov", incidents: 195, resolved: 188 },
  { month: "Dic", incidents: 210, resolved: 203 },
  { month: "Ene", incidents: 185, resolved: 178 },
]

// Priority distribution
const priorityData = [
  { name: "Alta", value: incidents.filter(i => i.priority === "alta").length, fill: "#ef4444" },
  { name: "Media", value: incidents.filter(i => i.priority === "media").length, fill: "#eab308" },
  { name: "Baja", value: incidents.filter(i => i.priority === "baja").length, fill: "#22c55e" },
]

function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  delay = 0
}: {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  delay?: number
}) {
  const isPositive = change > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
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
          <div className="flex items-center text-xs text-muted-foreground">
            <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(change)}%
            </span>
            <span className="ml-1">{changeLabel}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader title="Analytics" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* KPI Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Llamadas (Mes)"
            value="1,234"
            change={12.5}
            changeLabel="vs mes anterior"
            icon={<Phone className="h-4 w-4" />}
            delay={0}
          />
          <StatCard
            title="Tiempo Respuesta Medio"
            value="18 min"
            change={-8.2}
            changeLabel="vs mes anterior"
            icon={<Clock className="h-4 w-4" />}
            delay={0.1}
          />
          <StatCard
            title="Tasa de Resolución"
            value="94.5%"
            change={2.1}
            changeLabel="vs mes anterior"
            icon={<CheckCircle className="h-4 w-4" />}
            delay={0.2}
          />
          <StatCard
            title="Clientes Atendidos"
            value="892"
            change={15.3}
            changeLabel="vs mes anterior"
            icon={<Users className="h-4 w-4" />}
            delay={0.3}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="incidents">Incidentes</TabsTrigger>
            <TabsTrigger value="workshops">Talleres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Monthly Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia Mensual</CardTitle>
                  <CardDescription>Incidentes vs resueltos (últimos 6 meses)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart data={monthlyTrend} accessibilityLayer>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="incidents"
                        stroke="var(--color-calls)"
                        fill="var(--color-calls)"
                        fillOpacity={0.3}
                        name="Incidentes"
                      />
                      <Area
                        type="monotone"
                        dataKey="resolved"
                        stroke="var(--color-resolved)"
                        fill="var(--color-resolved)"
                        fillOpacity={0.3}
                        name="Resueltos"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Calls per Day */}
              <Card>
                <CardHeader>
                  <CardTitle>Llamadas por Día</CardTitle>
                  <CardDescription>Distribución semanal de llamadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={callsPerDayData} accessibilityLayer>
                      <XAxis dataKey="date" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="calls" fill="var(--color-calls)" radius={[4, 4, 0, 0]} name="Llamadas" />
                      <Bar dataKey="resolved" fill="var(--color-resolved)" radius={[4, 4, 0, 0]} name="Resueltos" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Response Time */}
            <Card>
              <CardHeader>
                <CardTitle>Tiempo de Respuesta por Hora</CardTitle>
                <CardDescription>Tiempo promedio de respuesta durante el día</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <LineChart data={responseTimeData} accessibilityLayer>
                    <XAxis dataKey="hour" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} unit=" min" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke="var(--color-time)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-time)" }}
                      name="Tiempo"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Incidents by Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Incidentes por Tipo</CardTitle>
                  <CardDescription>Distribución de tipos de incidente</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[400px]">
                    <PieChart>
                      <Pie
                        data={incidentsByTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                        label={({ type, count }) => `${type}: ${count}`}
                      >
                        {incidentsByTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Priority Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Prioridad</CardTitle>
                  <CardDescription>Incidentes actuales por nivel de prioridad</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[400px]">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Workshop Ratings */}
              <Card>
                <CardHeader>
                  <CardTitle>Valoración de Talleres</CardTitle>
                  <CardDescription>Puntuación media de cada taller</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={workshopPerformance} layout="vertical" accessibilityLayer>
                      <XAxis type="number" domain={[0, 5]} tickLine={false} axisLine={false} />
                      <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="rating" fill="var(--color-calls)" radius={[0, 4, 4, 0]} name="Rating" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Response Times */}
              <Card>
                <CardHeader>
                  <CardTitle>Tiempo de Respuesta por Taller</CardTitle>
                  <CardDescription>Tiempo promedio de respuesta (minutos)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={workshopPerformance} layout="vertical" accessibilityLayer>
                      <XAxis type="number" tickLine={false} axisLine={false} />
                      <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="responseTime" fill="var(--color-resolved)" radius={[0, 4, 4, 0]} name="Tiempo (min)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
