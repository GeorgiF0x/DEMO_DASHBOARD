"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Phone, Cog, Send, Clock, CalendarCheck, CheckCircle } from "lucide-react"
import { incidents, statusLabels, Incident } from "@/lib/mock-data"

const pipelineStages: { status: Incident["status"]; icon: React.ReactNode; color: string }[] = [
  { status: "llamada_recibida", icon: <Phone className="h-4 w-4" />, color: "bg-blue-500" },
  { status: "procesando", icon: <Cog className="h-4 w-4" />, color: "bg-yellow-500" },
  { status: "enviado_talleres", icon: <Send className="h-4 w-4" />, color: "bg-purple-500" },
  { status: "esperando_respuesta", icon: <Clock className="h-4 w-4" />, color: "bg-orange-500" },
  { status: "cita_confirmada", icon: <CalendarCheck className="h-4 w-4" />, color: "bg-green-500" },
  { status: "resuelto", icon: <CheckCircle className="h-4 w-4" />, color: "bg-gray-500" },
]

export function PipelineStatus() {
  const countByStatus = (status: Incident["status"]) =>
    incidents.filter(i => i.status === status).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline de Incidentes</CardTitle>
        <CardDescription>Estado actual del flujo de procesamiento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          {pipelineStages.map((stage, index) => (
            <motion.div
              key={stage.status}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center flex-1"
            >
              <div className={`${stage.color} text-white p-3 rounded-full mb-2`}>
                {stage.icon}
              </div>
              <span className="text-2xl font-bold">{countByStatus(stage.status)}</span>
              <span className="text-xs text-muted-foreground text-center leading-tight">
                {statusLabels[stage.status]}
              </span>
              {index < pipelineStages.length - 1 && (
                <div className="absolute hidden lg:block" style={{ left: '50%', transform: 'translateX(100%)' }}>
                  {/* Arrow would go here */}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
