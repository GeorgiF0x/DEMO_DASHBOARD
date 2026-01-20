"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  Search,
  User,
  Car,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Loader2,
  FileText,
  Smile,
  Meh,
  Frown
} from "lucide-react"
import { calls, Call } from "@/lib/mock-data"

const statusConfig: Record<Call["status"], { label: string; color: string; icon: React.ReactNode }> = {
  en_curso: { label: "En curso", color: "bg-green-500 animate-pulse", icon: <Phone className="h-4 w-4" /> },
  completada: { label: "Completada", color: "bg-blue-500", icon: <CheckCircle className="h-4 w-4" /> },
  perdida: { label: "Perdida", color: "bg-red-500", icon: <PhoneMissed className="h-4 w-4" /> },
  en_espera: { label: "En espera", color: "bg-yellow-500 animate-pulse", icon: <Loader2 className="h-4 w-4 animate-spin" /> }
}

const sentimentConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  positivo: { label: "Positivo", color: "text-green-500", icon: <Smile className="h-4 w-4" /> },
  neutral: { label: "Neutral", color: "text-gray-500", icon: <Meh className="h-4 w-4" /> },
  negativo: { label: "Negativo", color: "text-red-500", icon: <Frown className="h-4 w-4" /> }
}

function formatDuration(seconds: number): string {
  if (seconds === 0) return "--:--"
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

function CallCard({ call }: { call: Call }) {
  const status = statusConfig[call.status]
  const sentiment = call.sentiment ? sentimentConfig[call.sentiment] : null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.01 }}
          className="cursor-pointer"
        >
          <Card className={`hover:shadow-md transition-shadow ${call.status === 'en_curso' ? 'border-green-500 border-2' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${call.direction === 'entrante' ? 'bg-blue-100' : 'bg-green-100'}`}>
                    {call.direction === 'entrante'
                      ? <PhoneIncoming className="h-5 w-5 text-blue-600" />
                      : <PhoneOutgoing className="h-5 w-5 text-green-600" />
                    }
                  </div>
                  <div>
                    <div className="font-medium">{call.callerName}</div>
                    <div className="text-sm text-muted-foreground">{call.phone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${status.color} text-white`}>
                    {status.icon}
                    <span className="ml-1">{status.label}</span>
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatTime(call.timestamp)}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDuration(call.duration)}
                  </span>
                  {call.incidentId && (
                    <Badge variant="outline">{call.incidentId}</Badge>
                  )}
                </div>
                {sentiment && (
                  <span className={`flex items-center gap-1 ${sentiment.color}`}>
                    {sentiment.icon}
                    {sentiment.label}
                  </span>
                )}
              </div>

              {call.extractedData && (
                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-xs">
                  {call.extractedData.vehicle && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Car className="h-3 w-3" />
                      {call.extractedData.vehicle}
                    </div>
                  )}
                  {call.extractedData.location && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {call.extractedData.location.slice(0, 25)}...
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Llamada {call.id}
            <Badge className={`${status.color} text-white ml-2`}>{status.label}</Badge>
          </DialogTitle>
          <DialogDescription>
            {call.direction === 'entrante' ? 'Llamada entrante' : 'Llamada saliente'} - {formatTime(call.timestamp)}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="transcription" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transcription">Transcripción</TabsTrigger>
            <TabsTrigger value="data">Datos Extraídos</TabsTrigger>
            <TabsTrigger value="info">Información</TabsTrigger>
          </TabsList>

          <TabsContent value="transcription" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Transcripción de la llamada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {call.transcription ? (
                    <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-4 rounded-lg">
                      {call.transcription}
                    </pre>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p>Procesando transcripción...</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="mt-4">
            <div className="grid gap-4">
              {call.extractedData ? (
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Vehículo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Modelo</div>
                          <div className="font-medium">{call.extractedData.vehicle || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Matrícula</div>
                          <div className="font-medium">{call.extractedData.plate || '-'}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Problema Reportado
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{call.extractedData.issue || 'No especificado'}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Ubicación
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{call.extractedData.location || 'No especificada'}</p>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p>No se han extraído datos de esta llamada</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Llamante</CardDescription>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {call.callerName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{call.phone}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Duración</CardDescription>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatDuration(call.duration)}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Incidente Asociado</CardDescription>
                  <CardTitle>{call.incidentId || 'Sin asignar'}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Sentimiento Detectado</CardDescription>
                  <CardTitle className={`flex items-center gap-2 ${sentiment?.color || ''}`}>
                    {sentiment?.icon}
                    {sentiment?.label || 'No analizado'}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default function LlamadasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredCalls = calls.filter(call => {
    const matchesSearch = searchQuery === "" ||
      call.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.phone.includes(searchQuery) ||
      call.incidentId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || call.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: calls.length,
    enCurso: calls.filter(c => c.status === "en_curso").length,
    enEspera: calls.filter(c => c.status === "en_espera").length,
    completadas: calls.filter(c => c.status === "completada").length,
    avgDuration: Math.round(calls.filter(c => c.duration > 0).reduce((acc, c) => acc + c.duration, 0) / calls.filter(c => c.duration > 0).length)
  }

  return (
    <>
      <DashboardHeader title="Llamadas" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Live Call Alert */}
        {stats.enCurso > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-green-500 border-2 bg-green-50 dark:bg-green-950">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Phone className="h-6 w-6 text-green-600" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <div>
                    <div className="font-medium text-green-800 dark:text-green-200">
                      {stats.enCurso} llamada{stats.enCurso > 1 ? 's' : ''} en curso
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {stats.enEspera > 0 && `${stats.enEspera} en espera`}
                    </div>
                  </div>
                </div>
                <Button variant="default" className="bg-green-600 hover:bg-green-700">
                  Ver llamadas activas
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Hoy</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>En Curso</CardDescription>
              <CardTitle className="text-2xl text-green-600">{stats.enCurso}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completadas</CardDescription>
              <CardTitle className="text-2xl text-blue-600">{stats.completadas}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Duración Media</CardDescription>
              <CardTitle className="text-2xl">{formatDuration(stats.avgDuration)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, teléfono o incidente..."
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
              variant={statusFilter === "en_curso" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("en_curso")}
            >
              En curso
            </Button>
            <Button
              variant={statusFilter === "completada" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("completada")}
            >
              Completadas
            </Button>
            <Button
              variant={statusFilter === "en_espera" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("en_espera")}
            >
              En espera
            </Button>
          </div>
        </div>

        {/* Calls List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredCalls.map((call, index) => (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <CallCard call={call} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCalls.length === 0 && (
          <div className="text-center py-12">
            <Phone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No se encontraron llamadas</h3>
            <p className="text-sm text-muted-foreground">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </>
  )
}
