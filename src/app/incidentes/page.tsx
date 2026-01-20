"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Car,
  MapPin,
  Phone,
  Clock,
  User,
  FileText,
  Calendar,
  Wrench,
  MessageSquare
} from "lucide-react"
import {
  incidents,
  communications,
  statusLabels,
  priorityLabels,
  Incident
} from "@/lib/mock-data"

const statusVariants: Record<Incident["status"], string> = {
  llamada_recibida: "bg-blue-100 text-blue-800 border-blue-200",
  procesando: "bg-yellow-100 text-yellow-800 border-yellow-200",
  enviado_talleres: "bg-purple-100 text-purple-800 border-purple-200",
  esperando_respuesta: "bg-orange-100 text-orange-800 border-orange-200",
  cita_confirmada: "bg-green-100 text-green-800 border-green-200",
  resuelto: "bg-gray-100 text-gray-800 border-gray-200"
}

const priorityVariants: Record<Incident["priority"], string> = {
  alta: "bg-red-100 text-red-800",
  media: "bg-yellow-100 text-yellow-800",
  baja: "bg-green-100 text-green-800"
}

function IncidentCard({ incident, onClick }: { incident: Incident; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className={`border-l-4 ${statusVariants[incident.status].split(' ')[2]}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{incident.id}</CardTitle>
            <Badge className={priorityVariants[incident.priority]}>
              {priorityLabels[incident.priority]}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {incident.caller}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span>{incident.vehicle.brand} {incident.vehicle.model}</span>
            <Badge variant="outline" className="text-xs">{incident.vehicle.plate}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{incident.issue}</p>
          <div className="flex items-center justify-between pt-2">
            <Badge className={statusVariants[incident.status]}>
              {statusLabels[incident.status]}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(incident.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function IncidentDetail({ incident }: { incident: Incident }) {
  const relatedComms = communications.filter(c => c.incidentId === incident.id)

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Detalles</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="comms">Comunicaciones</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Cliente</label>
            <p className="font-medium">{incident.caller}</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Teléfono</label>
            <p className="font-medium">{incident.phone}</p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Vehículo</label>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span>{incident.vehicle.brand} {incident.vehicle.model} ({incident.vehicle.year})</span>
            <Badge variant="outline">{incident.vehicle.plate}</Badge>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Ubicación</label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{incident.location}</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Descripción del problema</label>
          <p className="text-sm bg-muted p-3 rounded-md">{incident.issue}</p>
        </div>

        {incident.assignedWorkshop && (
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Taller asignado</label>
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span>{incident.assignedWorkshop}</span>
            </div>
          </div>
        )}

        {incident.appointmentDate && (
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Cita programada</label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(incident.appointmentDate).toLocaleString('es-ES')}</span>
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="timeline" className="mt-4">
        <div className="relative pl-6 space-y-4">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />

          <div className="relative">
            <div className="absolute -left-4 w-3 h-3 rounded-full bg-blue-500" />
            <div className="ml-2">
              <p className="text-sm font-medium">Llamada recibida</p>
              <p className="text-xs text-muted-foreground">
                {new Date(incident.createdAt).toLocaleString('es-ES')}
              </p>
            </div>
          </div>

          {incident.status !== "llamada_recibida" && (
            <div className="relative">
              <div className="absolute -left-4 w-3 h-3 rounded-full bg-yellow-500" />
              <div className="ml-2">
                <p className="text-sm font-medium">IA procesando llamada</p>
                <p className="text-xs text-muted-foreground">Extrayendo datos del vehículo y problema</p>
              </div>
            </div>
          )}

          {["enviado_talleres", "esperando_respuesta", "cita_confirmada", "resuelto"].includes(incident.status) && (
            <div className="relative">
              <div className="absolute -left-4 w-3 h-3 rounded-full bg-purple-500" />
              <div className="ml-2">
                <p className="text-sm font-medium">Solicitud enviada a talleres</p>
                <p className="text-xs text-muted-foreground">Email enviado a talleres cercanos</p>
              </div>
            </div>
          )}

          {["cita_confirmada", "resuelto"].includes(incident.status) && (
            <div className="relative">
              <div className="absolute -left-4 w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-2">
                <p className="text-sm font-medium">Cita confirmada</p>
                <p className="text-xs text-muted-foreground">{incident.assignedWorkshop}</p>
              </div>
            </div>
          )}

          {incident.status === "resuelto" && (
            <div className="relative">
              <div className="absolute -left-4 w-3 h-3 rounded-full bg-gray-500" />
              <div className="ml-2">
                <p className="text-sm font-medium">Incidente resuelto</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(incident.updatedAt).toLocaleString('es-ES')}
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="comms" className="mt-4">
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {relatedComms.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay comunicaciones registradas
              </p>
            ) : (
              relatedComms.map(comm => (
                <div key={comm.id} className="p-3 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{comm.type.replace('_', ' ')}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comm.timestamp).toLocaleString('es-ES')}
                    </span>
                  </div>
                  {comm.subject && (
                    <p className="text-sm font-medium">{comm.subject}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{comm.content}</p>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}

export default function IncidentesPage() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter
    const matchesSearch = searchQuery === "" ||
      incident.caller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const groupedByStatus = Object.entries(statusLabels).map(([status, label]) => ({
    status: status as Incident["status"],
    label,
    incidents: filteredIncidents.filter(i => i.status === status)
  }))

  return (
    <>
      <DashboardHeader title="Incidentes" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID, nombre o matrícula..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="kanban" className="flex-1">
          <TabsList>
            <TabsTrigger value="kanban">Vista Kanban</TabsTrigger>
            <TabsTrigger value="list">Vista Lista</TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {groupedByStatus.map(({ status, label, incidents: groupIncidents }) => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{label}</h3>
                    <Badge variant="secondary">{groupIncidents.length}</Badge>
                  </div>
                  <div className="space-y-3 min-h-[200px]">
                    <AnimatePresence mode="popLayout">
                      {groupIncidents.map(incident => (
                        <Dialog key={incident.id}>
                          <DialogTrigger asChild>
                            <div>
                              <IncidentCard
                                incident={incident}
                                onClick={() => setSelectedIncident(incident)}
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {incident.id}
                                <Badge className={statusVariants[incident.status]}>
                                  {statusLabels[incident.status]}
                                </Badge>
                              </DialogTitle>
                              <DialogDescription>
                                Creado el {new Date(incident.createdAt).toLocaleString('es-ES')}
                              </DialogDescription>
                            </DialogHeader>
                            <IncidentDetail incident={incident} />
                          </DialogContent>
                        </Dialog>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-medium">ID</th>
                        <th className="text-left p-3 font-medium">Cliente</th>
                        <th className="text-left p-3 font-medium">Vehículo</th>
                        <th className="text-left p-3 font-medium">Problema</th>
                        <th className="text-left p-3 font-medium">Estado</th>
                        <th className="text-left p-3 font-medium">Prioridad</th>
                        <th className="text-left p-3 font-medium">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIncidents.map(incident => (
                        <Dialog key={incident.id}>
                          <DialogTrigger asChild>
                            <tr className="border-b hover:bg-muted/50 cursor-pointer">
                              <td className="p-3 font-medium">{incident.id}</td>
                              <td className="p-3">{incident.caller}</td>
                              <td className="p-3">
                                {incident.vehicle.brand} {incident.vehicle.model}
                                <span className="text-xs text-muted-foreground ml-2">
                                  {incident.vehicle.plate}
                                </span>
                              </td>
                              <td className="p-3 max-w-[200px] truncate">{incident.issue}</td>
                              <td className="p-3">
                                <Badge className={statusVariants[incident.status]}>
                                  {statusLabels[incident.status]}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Badge className={priorityVariants[incident.priority]}>
                                  {priorityLabels[incident.priority]}
                                </Badge>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">
                                {new Date(incident.createdAt).toLocaleDateString('es-ES')}
                              </td>
                            </tr>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {incident.id}
                                <Badge className={statusVariants[incident.status]}>
                                  {statusLabels[incident.status]}
                                </Badge>
                              </DialogTitle>
                              <DialogDescription>
                                Creado el {new Date(incident.createdAt).toLocaleString('es-ES')}
                              </DialogDescription>
                            </DialogHeader>
                            <IncidentDetail incident={incident} />
                          </DialogContent>
                        </Dialog>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
