"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Send,
  ArrowDownLeft,
  ArrowUpRight
} from "lucide-react"
import { communications, Communication } from "@/lib/mock-data"

const typeIcons: Record<Communication["type"], React.ReactNode> = {
  llamada_entrante: <ArrowDownLeft className="h-4 w-4" />,
  llamada_saliente: <ArrowUpRight className="h-4 w-4" />,
  email_enviado: <Send className="h-4 w-4" />,
  email_recibido: <Mail className="h-4 w-4" />,
  sms: <MessageSquare className="h-4 w-4" />
}

const typeLabels: Record<Communication["type"], string> = {
  llamada_entrante: "Llamada entrante",
  llamada_saliente: "Llamada saliente",
  email_enviado: "Email enviado",
  email_recibido: "Email recibido",
  sms: "SMS"
}

const typeColors: Record<Communication["type"], string> = {
  llamada_entrante: "bg-blue-100 text-blue-700",
  llamada_saliente: "bg-green-100 text-green-700",
  email_enviado: "bg-purple-100 text-purple-700",
  email_recibido: "bg-orange-100 text-orange-700",
  sms: "bg-pink-100 text-pink-700"
}

const statusIcons: Record<Communication["status"], React.ReactNode> = {
  enviado: <Clock className="h-3 w-3" />,
  entregado: <CheckCircle className="h-3 w-3" />,
  leido: <Eye className="h-3 w-3" />,
  respondido: <CheckCircle className="h-3 w-3" />,
  fallido: <XCircle className="h-3 w-3" />
}

const statusLabels: Record<Communication["status"], string> = {
  enviado: "Enviado",
  entregado: "Entregado",
  leido: "Leído",
  respondido: "Respondido",
  fallido: "Fallido"
}

const statusColors: Record<Communication["status"], string> = {
  enviado: "text-yellow-600",
  entregado: "text-blue-600",
  leido: "text-green-600",
  respondido: "text-green-600",
  fallido: "text-red-600"
}

function CommunicationCard({ comm }: { comm: Communication }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${typeColors[comm.type]}`}>
          {typeIcons[comm.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{typeLabels[comm.type]}</span>
              <Badge variant="outline" className="text-xs">{comm.incidentId}</Badge>
            </div>
            <div className={`flex items-center gap-1 text-xs ${statusColors[comm.status]}`}>
              {statusIcons[comm.status]}
              <span>{statusLabels[comm.status]}</span>
            </div>
          </div>

          {comm.subject && (
            <p className="font-medium text-sm mb-1">{comm.subject}</p>
          )}

          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {comm.content}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>De: {comm.from}</span>
              <span>A: {comm.to}</span>
            </div>
            <span>{new Date(comm.timestamp).toLocaleString('es-ES')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ComunicacionesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredComms = communications.filter(comm => {
    const matchesSearch = searchQuery === "" ||
      comm.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.incidentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comm.subject && comm.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = typeFilter === "all" || comm.type === typeFilter
    return matchesSearch && matchesType
  })

  const stats = {
    total: communications.length,
    llamadas: communications.filter(c => c.type.includes('llamada')).length,
    emails: communications.filter(c => c.type.includes('email')).length,
    sms: communications.filter(c => c.type === 'sms').length,
    respondidos: communications.filter(c => c.status === 'respondido').length
  }

  return (
    <>
      <DashboardHeader title="Comunicaciones" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Llamadas</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-500" />
                {stats.llamadas}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Emails</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-500" />
                {stats.emails}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>SMS</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-pink-500" />
                {stats.sms}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Respondidos</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                {stats.respondidos}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar comunicaciones..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setTypeFilter}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="llamada_entrante">Llamadas entrantes</TabsTrigger>
            <TabsTrigger value="email_enviado">Emails enviados</TabsTrigger>
            <TabsTrigger value="email_recibido">Emails recibidos</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
          </TabsList>

          <TabsContent value={typeFilter} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Comunicaciones</CardTitle>
                <CardDescription>
                  {filteredComms.length} comunicaciones encontradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {filteredComms.map((comm, index) => (
                        <motion.div
                          key={comm.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.02 }}
                        >
                          <CommunicationCard comm={comm} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
