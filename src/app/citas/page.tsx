"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { motion } from "framer-motion"
import {
  CalendarDays,
  Clock,
  Search,
  MapPin,
  Phone,
  Car,
  Wrench,
  Euro,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  CalendarCheck,
  List
} from "lucide-react"
import { appointments, Appointment } from "@/lib/mock-data"

const statusConfig: Record<Appointment["status"], { label: string; color: string; icon: React.ReactNode }> = {
  programada: { label: "Programada", color: "bg-blue-100 text-blue-800", icon: <CalendarDays className="h-4 w-4" /> },
  confirmada: { label: "Confirmada", color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
  en_curso: { label: "En curso", color: "bg-yellow-100 text-yellow-800", icon: <Loader2 className="h-4 w-4 animate-spin" /> },
  completada: { label: "Completada", color: "bg-gray-100 text-gray-800", icon: <CheckCircle className="h-4 w-4" /> },
  cancelada: { label: "Cancelada", color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
  no_show: { label: "No presentado", color: "bg-orange-100 text-orange-800", icon: <AlertCircle className="h-4 w-4" /> }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const status = statusConfig[appointment.status]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="cursor-pointer"
        >
          <Card className={`hover:shadow-md transition-shadow ${appointment.status === 'en_curso' ? 'border-yellow-500 border-2' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium">{appointment.clientName}</div>
                  <div className="text-sm text-muted-foreground">{appointment.vehicle}</div>
                </div>
                <Badge className={status.color}>
                  {status.icon}
                  <span className="ml-1">{status.label}</span>
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.time} ({appointment.duration} min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.workshopName}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{appointment.service}</span>
                {appointment.estimatedCost && (
                  <span className="font-medium flex items-center gap-1">
                    <Euro className="h-3 w-3" />
                    {appointment.estimatedCost}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5" />
            Cita {appointment.id}
          </DialogTitle>
          <DialogDescription>
            {formatDate(appointment.date)} a las {appointment.time}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Estado</span>
            <Badge className={status.color}>
              {status.icon}
              <span className="ml-1">{status.label}</span>
            </Badge>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Cliente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="font-medium">{appointment.clientName}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {appointment.clientPhone}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Vehículo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span className="font-medium">{appointment.vehicle}</span>
                </div>
                <div className="text-sm text-muted-foreground">Matrícula: {appointment.plate}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Servicio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="font-medium">{appointment.service}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duración estimada</span>
                  <span>{appointment.duration} minutos</span>
                </div>
                {appointment.estimatedCost && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Coste estimado</span>
                    <span className="font-medium">{appointment.estimatedCost}€</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Taller</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  <span className="font-medium">{appointment.workshopName}</span>
                </div>
                {appointment.incidentId && (
                  <div className="text-sm text-muted-foreground">
                    Incidente: {appointment.incidentId}
                  </div>
                )}
              </CardContent>
            </Card>

            {appointment.notes && (
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Notas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{appointment.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function CitasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list")

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = searchQuery === "" ||
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.workshopName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Group appointments by date
  const appointmentsByDate = filteredAppointments.reduce((acc, apt) => {
    if (!acc[apt.date]) acc[apt.date] = []
    acc[apt.date].push(apt)
    return acc
  }, {} as Record<string, Appointment[]>)

  const stats = {
    total: appointments.length,
    hoy: appointments.filter(a => a.date === "2025-01-20").length,
    confirmadas: appointments.filter(a => a.status === "confirmada").length,
    enCurso: appointments.filter(a => a.status === "en_curso").length,
    pendientes: appointments.filter(a => a.status === "programada").length
  }

  // Dates with appointments for calendar
  const datesWithAppointments = [...new Set(appointments.map(a => a.date))]

  return (
    <>
      <DashboardHeader title="Citas" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Citas</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Hoy</CardDescription>
              <CardTitle className="text-2xl text-primary">{stats.hoy}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>En Curso</CardDescription>
              <CardTitle className="text-2xl text-yellow-600">{stats.enCurso}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Confirmadas</CardDescription>
              <CardTitle className="text-2xl text-green-600">{stats.confirmadas}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pendientes</CardDescription>
              <CardTitle className="text-2xl text-blue-600">{stats.pendientes}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, vehículo o taller..."
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
              Todas
            </Button>
            <Button
              variant={statusFilter === "confirmada" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("confirmada")}
            >
              Confirmadas
            </Button>
            <Button
              variant={statusFilter === "programada" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("programada")}
            >
              Pendientes
            </Button>
            <Button
              variant={statusFilter === "en_curso" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("en_curso")}
            >
              En curso
            </Button>
          </div>
          <div className="ml-auto flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 mr-1" />
              Lista
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
            >
              <CalendarDays className="h-4 w-4 mr-1" />
              Calendario
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
          /* List View */
          <Tabs defaultValue="today" className="space-y-4">
            <TabsList>
              <TabsTrigger value="today">Hoy</TabsTrigger>
              <TabsTrigger value="tomorrow">Mañana</TabsTrigger>
              <TabsTrigger value="week">Esta semana</TabsTrigger>
              <TabsTrigger value="all">Todas</TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments
                  .filter(a => a.date === "2025-01-20")
                  .map((apt, index) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <AppointmentCard appointment={apt} />
                    </motion.div>
                  ))}
              </div>
              {appointments.filter(a => a.date === "2025-01-20").length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No hay citas programadas para hoy
                </div>
              )}
            </TabsContent>

            <TabsContent value="tomorrow">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments
                  .filter(a => a.date === "2025-01-21")
                  .map((apt, index) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <AppointmentCard appointment={apt} />
                    </motion.div>
                  ))}
              </div>
              {appointments.filter(a => a.date === "2025-01-21").length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No hay citas programadas para mañana
                </div>
              )}
            </TabsContent>

            <TabsContent value="week">
              <div className="space-y-6">
                {Object.entries(appointmentsByDate)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([date, apts]) => (
                    <div key={date}>
                      <h3 className="text-lg font-medium mb-3 capitalize">{formatDate(date)}</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {apts.map((apt, index) => (
                          <motion.div
                            key={apt.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <AppointmentCard appointment={apt} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="all">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Vehículo</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Taller</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Coste</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map(apt => {
                      const status = statusConfig[apt.status]
                      return (
                        <TableRow key={apt.id}>
                          <TableCell className="font-medium">{apt.clientName}</TableCell>
                          <TableCell>{apt.vehicle}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{apt.service}</TableCell>
                          <TableCell>{apt.workshopName}</TableCell>
                          <TableCell>{apt.date}</TableCell>
                          <TableCell>{apt.time}</TableCell>
                          <TableCell>
                            <Badge className={status.color}>{status.label}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{apt.estimatedCost ? `${apt.estimatedCost}€` : '-'}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          /* Calendar View */
          <div className="grid gap-4 md:grid-cols-[300px_1fr]">
            <Card>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    hasAppointment: datesWithAppointments.map(d => new Date(d))
                  }}
                  modifiersStyles={{
                    hasAppointment: { fontWeight: 'bold', backgroundColor: 'hsl(var(--primary) / 0.1)' }
                  }}
                  className="rounded-md"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Citas del {selectedDate?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {appointments
                    .filter(a => a.date === selectedDate?.toISOString().split('T')[0])
                    .map((apt, index) => (
                      <motion.div
                        key={apt.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <AppointmentCard appointment={apt} />
                      </motion.div>
                    ))}
                </div>
                {appointments.filter(a => a.date === selectedDate?.toISOString().split('T')[0]).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No hay citas programadas para esta fecha
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
