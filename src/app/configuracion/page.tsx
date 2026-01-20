"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  Bot,
  MessageSquare,
  Bell,
  Clock,
  Users,
  Palette,
  Save,
  Mail,
  Phone,
  Globe,
  Volume2,
  Zap,
  Shield,
  Building2,
  MapPin,
  Timer,
  Sun,
  Moon,
  Monitor,
  Check,
  ChevronRight
} from "lucide-react"

// Mock data for settings
const initialSettings = {
  ia: {
    nombre: "Tecozam Assistant",
    idioma: "es",
    velocidadRespuesta: "normal",
    tono: "profesional",
    saludoInicial: "Bienvenido a Tecozam, centralita de incidentes. ¿En qué puedo ayudarle?",
    despedida: "Gracias por contactar con Tecozam. Que tenga un buen día.",
  },
  notificaciones: {
    emailActivo: true,
    smsActivo: true,
    pushActivo: false,
    emailIncidenteNuevo: true,
    emailCitaConfirmada: true,
    smsCliente: true,
    alertaUrgente: true,
  },
  asignacion: {
    metodo: "proximidad",
    tiempoMaximoRespuesta: 30,
    reintentos: 3,
    prioridadRating: true,
    zonaPreferente: true,
  },
  horario: {
    inicio: "08:00",
    fin: "20:00",
    diasLaborables: ["lunes", "martes", "miercoles", "jueves", "viernes"],
    atencion24h: false,
  },
  apariencia: {
    tema: "system",
    colorPrimario: "#FF8A00",
  }
}

function SettingRow({
  icon,
  title,
  description,
  children
}: {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-muted">
          {icon}
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-primary' : 'bg-muted'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export default function ConfiguracionPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateNotification = (key: keyof typeof settings.notificaciones) => {
    setSettings(prev => ({
      ...prev,
      notificaciones: {
        ...prev.notificaciones,
        [key]: !prev.notificaciones[key]
      }
    }))
  }

  return (
    <>
      <DashboardHeader title="Configuración" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Tabs defaultValue="ia" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-5 w-auto">
              <TabsTrigger value="ia" className="gap-2">
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Centralita IA</span>
              </TabsTrigger>
              <TabsTrigger value="plantillas" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Plantillas</span>
              </TabsTrigger>
              <TabsTrigger value="notificaciones" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificaciones</span>
              </TabsTrigger>
              <TabsTrigger value="asignacion" className="gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Asignación</span>
              </TabsTrigger>
              <TabsTrigger value="apariencia" className="gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Apariencia</span>
              </TabsTrigger>
            </TabsList>

            <Button onClick={handleSave} className="gap-2">
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Guardado" : "Guardar cambios"}
            </Button>
          </div>

          {/* Centralita IA */}
          <TabsContent value="ia">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Configuración del Asistente IA</CardTitle>
                  <CardDescription>
                    Personaliza el comportamiento y respuestas de la centralita automatizada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre del asistente</label>
                      <Input
                        value={settings.ia.nombre}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          ia: { ...prev.ia, nombre: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Idioma</label>
                      <Select
                        value={settings.ia.idioma}
                        onValueChange={(value) => setSettings(prev => ({
                          ...prev,
                          ia: { ...prev.ia, idioma: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ca">Català</SelectItem>
                          <SelectItem value="eu">Euskara</SelectItem>
                          <SelectItem value="gl">Galego</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Velocidad de respuesta</label>
                      <Select
                        value={settings.ia.velocidadRespuesta}
                        onValueChange={(value) => setSettings(prev => ({
                          ...prev,
                          ia: { ...prev.ia, velocidadRespuesta: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lenta">Lenta (más natural)</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="rapida">Rápida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tono de comunicación</label>
                      <Select
                        value={settings.ia.tono}
                        onValueChange={(value) => setSettings(prev => ({
                          ...prev,
                          ia: { ...prev.ia, tono: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="profesional">Profesional</SelectItem>
                          <SelectItem value="cercano">Cercano</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mensaje de bienvenida</label>
                    <textarea
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={settings.ia.saludoInicial}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        ia: { ...prev.ia, saludoInicial: e.target.value }
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mensaje de despedida</label>
                    <textarea
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={settings.ia.despedida}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        ia: { ...prev.ia, despedida: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vista previa de la voz</CardTitle>
                  <CardDescription>Escucha cómo sonará el asistente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2">
                      <Volume2 className="h-4 w-4" />
                      Reproducir saludo
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Volume2 className="h-4 w-4" />
                      Reproducir despedida
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Plantillas */}
          <TabsContent value="plantillas">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Plantillas de Email</CardTitle>
                  <CardDescription>
                    Personaliza los emails automáticos que se envían a talleres y clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { id: "nuevo_incidente", titulo: "Nuevo incidente para taller", desc: "Se envía cuando se asigna un incidente a un taller" },
                    { id: "confirmacion_cita", titulo: "Confirmación de cita", desc: "Se envía al cliente cuando el taller confirma la cita" },
                    { id: "recordatorio", titulo: "Recordatorio de cita", desc: "Se envía 24h antes de la cita programada" },
                    { id: "seguimiento", titulo: "Seguimiento post-servicio", desc: "Se envía después de completar la reparación" },
                  ].map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{template.titulo}</div>
                          <div className="text-sm text-muted-foreground">{template.desc}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Editar
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plantillas de SMS</CardTitle>
                  <CardDescription>
                    Mensajes SMS automáticos para clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { id: "sms_confirmacion", titulo: "Confirmación de cita", desc: "Se envía cuando se confirma la cita" },
                    { id: "sms_recordatorio", titulo: "Recordatorio", desc: "Se envía 2h antes de la cita" },
                    { id: "sms_listo", titulo: "Vehículo listo", desc: "Se envía cuando el vehículo está listo para recoger" },
                  ].map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{template.titulo}</div>
                          <div className="text-sm text-muted-foreground">{template.desc}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Editar
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notificaciones */}
          <TabsContent value="notificaciones">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Canales de notificación</CardTitle>
                  <CardDescription>
                    Activa o desactiva los diferentes canales de comunicación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingRow
                    icon={<Mail className="h-4 w-4" />}
                    title="Notificaciones por Email"
                    description="Recibe actualizaciones por correo electrónico"
                  >
                    <Toggle
                      enabled={settings.notificaciones.emailActivo}
                      onChange={() => updateNotification('emailActivo')}
                    />
                  </SettingRow>
                  <Separator />
                  <SettingRow
                    icon={<Phone className="h-4 w-4" />}
                    title="Notificaciones por SMS"
                    description="Envía SMS automáticos a clientes"
                  >
                    <Toggle
                      enabled={settings.notificaciones.smsActivo}
                      onChange={() => updateNotification('smsActivo')}
                    />
                  </SettingRow>
                  <Separator />
                  <SettingRow
                    icon={<Bell className="h-4 w-4" />}
                    title="Notificaciones Push"
                    description="Alertas en tiempo real en el navegador"
                  >
                    <Toggle
                      enabled={settings.notificaciones.pushActivo}
                      onChange={() => updateNotification('pushActivo')}
                    />
                  </SettingRow>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertas automáticas</CardTitle>
                  <CardDescription>
                    Configura cuándo recibir notificaciones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingRow
                    icon={<Zap className="h-4 w-4" />}
                    title="Nuevo incidente"
                    description="Cuando se registra un nuevo incidente"
                  >
                    <Toggle
                      enabled={settings.notificaciones.emailIncidenteNuevo}
                      onChange={() => updateNotification('emailIncidenteNuevo')}
                    />
                  </SettingRow>
                  <Separator />
                  <SettingRow
                    icon={<Check className="h-4 w-4" />}
                    title="Cita confirmada"
                    description="Cuando un taller confirma una cita"
                  >
                    <Toggle
                      enabled={settings.notificaciones.emailCitaConfirmada}
                      onChange={() => updateNotification('emailCitaConfirmada')}
                    />
                  </SettingRow>
                  <Separator />
                  <SettingRow
                    icon={<Shield className="h-4 w-4" />}
                    title="Alertas urgentes"
                    description="Incidentes de alta prioridad"
                  >
                    <Toggle
                      enabled={settings.notificaciones.alertaUrgente}
                      onChange={() => updateNotification('alertaUrgente')}
                    />
                  </SettingRow>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Asignación */}
          <TabsContent value="asignacion">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Reglas de asignación de talleres</CardTitle>
                  <CardDescription>
                    Configura cómo se asignan los incidentes a los talleres
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Método de asignación</label>
                    <Select
                      value={settings.asignacion.metodo}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        asignacion: { ...prev.asignacion, metodo: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proximidad">Por proximidad geográfica</SelectItem>
                        <SelectItem value="rating">Por mejor valoración</SelectItem>
                        <SelectItem value="disponibilidad">Por disponibilidad</SelectItem>
                        <SelectItem value="rotacion">Rotación equitativa</SelectItem>
                        <SelectItem value="especialidad">Por especialidad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tiempo máximo de respuesta (min)</label>
                      <Input
                        type="number"
                        value={settings.asignacion.tiempoMaximoRespuesta}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          asignacion: { ...prev.asignacion, tiempoMaximoRespuesta: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reintentos antes de escalar</label>
                      <Input
                        type="number"
                        value={settings.asignacion.reintentos}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          asignacion: { ...prev.asignacion, reintentos: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <SettingRow
                    icon={<MapPin className="h-4 w-4" />}
                    title="Priorizar zona preferente"
                    description="Asignar primero a talleres en la zona del cliente"
                  >
                    <Toggle
                      enabled={settings.asignacion.zonaPreferente}
                      onChange={() => setSettings(prev => ({
                        ...prev,
                        asignacion: { ...prev.asignacion, zonaPreferente: !prev.asignacion.zonaPreferente }
                      }))}
                    />
                  </SettingRow>
                  <Separator />
                  <SettingRow
                    icon={<Building2 className="h-4 w-4" />}
                    title="Considerar valoración"
                    description="Dar prioridad a talleres mejor valorados"
                  >
                    <Toggle
                      enabled={settings.asignacion.prioridadRating}
                      onChange={() => setSettings(prev => ({
                        ...prev,
                        asignacion: { ...prev.asignacion, prioridadRating: !prev.asignacion.prioridadRating }
                      }))}
                    />
                  </SettingRow>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horario de atención</CardTitle>
                  <CardDescription>
                    Define el horario de funcionamiento de la centralita
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingRow
                    icon={<Clock className="h-4 w-4" />}
                    title="Atención 24 horas"
                    description="La centralita funciona las 24 horas del día"
                  >
                    <Toggle
                      enabled={settings.horario.atencion24h}
                      onChange={() => setSettings(prev => ({
                        ...prev,
                        horario: { ...prev.horario, atencion24h: !prev.horario.atencion24h }
                      }))}
                    />
                  </SettingRow>

                  {!settings.horario.atencion24h && (
                    <div className="grid gap-4 md:grid-cols-2 pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Hora de inicio</label>
                        <Input
                          type="time"
                          value={settings.horario.inicio}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            horario: { ...prev.horario, inicio: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Hora de fin</label>
                        <Input
                          type="time"
                          value={settings.horario.fin}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            horario: { ...prev.horario, fin: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Apariencia */}
          <TabsContent value="apariencia">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tema de la interfaz</CardTitle>
                  <CardDescription>
                    Personaliza la apariencia del dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "light", icon: Sun, label: "Claro" },
                      { id: "dark", icon: Moon, label: "Oscuro" },
                      { id: "system", icon: Monitor, label: "Sistema" },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          apariencia: { ...prev.apariencia, tema: theme.id }
                        }))}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                          settings.apariencia.tema === theme.id
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-muted-foreground/50'
                        }`}
                      >
                        <theme.icon className={`h-6 w-6 ${settings.apariencia.tema === theme.id ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-medium">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color corporativo</CardTitle>
                  <CardDescription>
                    El color principal de la marca
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-lg border"
                      style={{ backgroundColor: settings.apariencia.colorPrimario }}
                    />
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={settings.apariencia.colorPrimario}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          apariencia: { ...prev.apariencia, colorPrimario: e.target.value }
                        }))}
                      />
                    </div>
                    <Input
                      type="color"
                      value={settings.apariencia.colorPrimario}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        apariencia: { ...prev.apariencia, colorPrimario: e.target.value }
                      }))}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logo y marca</CardTitle>
                  <CardDescription>
                    Personaliza el logo de la aplicación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg border bg-white flex items-center justify-center">
                      <img
                        src="https://play-lh.googleusercontent.com/kB-tC8229RW4P5oRG6W7rzIfYPjTRwiPou-KnK5xvsgeQzzHC74wrZWwVIvRyWuTtvV6=w240-h480-rw"
                        alt="Logo"
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <Button variant="outline">Cambiar logo</Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG o SVG, máximo 1MB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
