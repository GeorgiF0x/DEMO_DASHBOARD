"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Clock, Wrench } from "lucide-react"
import { motion } from "framer-motion"
import { workshops, Workshop } from "@/lib/mock-data"

const statusVariants: Record<Workshop["status"], string> = {
  disponible: "bg-green-100 text-green-800",
  ocupado: "bg-yellow-100 text-yellow-800",
  cerrado: "bg-gray-100 text-gray-800"
}

const statusLabels: Record<Workshop["status"], string> = {
  disponible: "Disponible",
  ocupado: "Ocupado",
  cerrado: "Cerrado"
}

export function WorkshopStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Talleres Activos</CardTitle>
        <CardDescription>Estado de talleres asociados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {workshops.slice(0, 4).map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-9 w-9 bg-primary/10">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  <Wrench className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{workshop.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {workshop.rating}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="h-3 w-3" />
                    {workshop.responseTime} min
                  </span>
                </div>
              </div>
              <Badge className={statusVariants[workshop.status]}>
                {statusLabels[workshop.status]}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
