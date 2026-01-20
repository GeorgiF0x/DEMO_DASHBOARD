"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  Search,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Building2
} from "lucide-react"
import { workshops, incidents, Workshop } from "@/lib/mock-data"

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

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const workshopIncidents = incidents.filter(i => i.assignedWorkshop === workshop.name)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Avatar className="h-12 w-12 bg-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Wrench className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <Badge className={statusVariants[workshop.status]}>
                  {statusLabels[workshop.status]}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-2">{workshop.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {workshop.city}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{workshop.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{workshop.responseTime} min respuesta</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {workshop.specialties.slice(0, 2).map(specialty => (
                  <Badge key={specialty} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {workshop.specialties.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{workshop.specialties.length - 2}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Incidentes activos</span>
                <Badge variant="secondary">{workshop.activeIncidents}</Badge>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {workshop.name}
              <Badge className={statusVariants[workshop.status]}>
                {statusLabels[workshop.status]}
              </Badge>
            </DialogTitle>
            <DialogDescription>{workshop.address}, {workshop.city}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
              <TabsTrigger value="incidents">Incidentes</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Teléfono</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{workshop.phone}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{workshop.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Dirección completa</label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{workshop.address}, {workshop.city}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Especialidades</label>
                <div className="flex flex-wrap gap-2">
                  {workshop.specialties.map(specialty => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Valoración</CardDescription>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      {workshop.rating} / 5.0
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Tiempo de respuesta</CardDescription>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {workshop.responseTime} min
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Incidentes activos</CardDescription>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      {workshop.activeIncidents}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Incidentes resueltos (mes)</CardDescription>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {Math.floor(Math.random() * 30) + 10}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="incidents" className="mt-4">
              <div className="space-y-3">
                {workshopIncidents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No hay incidentes asignados actualmente
                  </p>
                ) : (
                  workshopIncidents.map(incident => (
                    <div key={incident.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{incident.id}</span>
                        <Badge variant="outline">{incident.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{incident.issue}</p>
                      <div className="text-xs text-muted-foreground">
                        {incident.vehicle.brand} {incident.vehicle.model} - {incident.vehicle.plate}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

export default function TalleresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = searchQuery === "" ||
      workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || workshop.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: workshops.length,
    disponibles: workshops.filter(w => w.status === "disponible").length,
    ocupados: workshops.filter(w => w.status === "ocupado").length,
    avgRating: (workshops.reduce((acc, w) => acc + w.rating, 0) / workshops.length).toFixed(1),
    avgResponseTime: Math.round(workshops.reduce((acc, w) => acc + w.responseTime, 0) / workshops.length)
  }

  return (
    <>
      <DashboardHeader title="Talleres" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Talleres</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Disponibles</CardDescription>
              <CardTitle className="text-2xl text-green-600">{stats.disponibles}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Valoración Media</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                {stats.avgRating}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tiempo Respuesta Medio</CardDescription>
              <CardTitle className="text-2xl">{stats.avgResponseTime} min</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar talleres..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              Todos
            </Button>
            <Button
              variant={statusFilter === "disponible" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("disponible")}
            >
              Disponibles
            </Button>
            <Button
              variant={statusFilter === "ocupado" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("ocupado")}
            >
              Ocupados
            </Button>
          </div>
        </div>

        {/* Workshop Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <WorkshopCard workshop={workshop} />
            </motion.div>
          ))}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No se encontraron talleres</h3>
            <p className="text-sm text-muted-foreground">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </>
  )
}
