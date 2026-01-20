"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react"
import { communications } from "@/lib/mock-data"

const typeIcons: Record<string, React.ReactNode> = {
  llamada_entrante: <Phone className="h-4 w-4" />,
  llamada_saliente: <Phone className="h-4 w-4" />,
  email_enviado: <Mail className="h-4 w-4" />,
  email_recibido: <Mail className="h-4 w-4" />,
  sms: <MessageSquare className="h-4 w-4" />
}

const typeColors: Record<string, string> = {
  llamada_entrante: "bg-blue-100 text-blue-600",
  llamada_saliente: "bg-green-100 text-green-600",
  email_enviado: "bg-purple-100 text-purple-600",
  email_recibido: "bg-orange-100 text-orange-600",
  sms: "bg-pink-100 text-pink-600"
}

const typeLabels: Record<string, string> = {
  llamada_entrante: "Llamada entrante",
  llamada_saliente: "Llamada saliente",
  email_enviado: "Email enviado",
  email_recibido: "Email recibido",
  sms: "SMS"
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

export function LiveActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Actividad en Tiempo Real
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </CardTitle>
        <CardDescription>Últimas comunicaciones del sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {communications.map((comm, index) => (
              <motion.div
                key={comm.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-start gap-3 p-2 rounded-lg bg-muted/30"
              >
                <div className={`p-2 rounded-full ${typeColors[comm.type]}`}>
                  {typeIcons[comm.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{typeLabels[comm.type]}</span>
                    <Badge variant="outline" className="text-[10px]">{comm.incidentId}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {comm.subject || comm.content.slice(0, 80)}...
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTime(comm.timestamp)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
