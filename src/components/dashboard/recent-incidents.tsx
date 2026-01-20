"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight, Car, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Incident, statusLabels } from "@/lib/mock-data"

interface RecentIncidentsProps {
  incidents: Incident[]
}

const statusVariants: Record<Incident["status"], string> = {
  llamada_recibida: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  procesando: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  enviado_talleres: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  esperando_respuesta: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  cita_confirmada: "bg-green-100 text-green-800 hover:bg-green-100",
  resuelto: "bg-gray-100 text-gray-800 hover:bg-gray-100"
}

const priorityVariants: Record<Incident["priority"], string> = {
  alta: "bg-red-100 text-red-800",
  media: "bg-yellow-100 text-yellow-800",
  baja: "bg-green-100 text-green-800"
}

export function RecentIncidents({ incidents }: RecentIncidentsProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Incidentes Recientes</CardTitle>
          <CardDescription>Últimas llamadas procesadas por la centralita</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/incidentes" className="gap-1">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.slice(0, 5).map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-10 w-10 bg-primary/10">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {incident.caller.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm truncate">{incident.caller}</span>
                  <Badge variant="outline" className={priorityVariants[incident.priority]}>
                    {incident.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Car className="h-3 w-3" />
                    {incident.vehicle.brand} {incident.vehicle.model}
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="h-3 w-3" />
                    {incident.location.split(',')[0]}
                  </span>
                </div>
              </div>
              <Badge className={statusVariants[incident.status]}>
                {statusLabels[incident.status]}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
