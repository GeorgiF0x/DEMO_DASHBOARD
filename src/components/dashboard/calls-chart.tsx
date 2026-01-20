"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { callsPerDayData } from "@/lib/mock-data"

const chartConfig = {
  calls: {
    label: "Llamadas",
    color: "hsl(var(--chart-1))",
  },
  resolved: {
    label: "Resueltos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function CallsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Llamadas de la Semana</CardTitle>
        <CardDescription>Llamadas recibidas vs incidentes resueltos</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={callsPerDayData} accessibilityLayer>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="calls" fill="var(--color-calls)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" fill="var(--color-resolved)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
