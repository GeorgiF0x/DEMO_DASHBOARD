"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  X,
  Send,
  Sparkles,
  Wrench,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Minimize2,
  Maximize2
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  prompt: string
}

const quickActions: QuickAction[] = [
  {
    id: "estribadora",
    label: "Manual Estribadora",
    icon: <Wrench className="h-3 w-3" />,
    prompt: "¿Cómo funciona la estribadora automática?"
  },
  {
    id: "dobladora",
    label: "Guía Dobladora",
    icon: <BookOpen className="h-3 w-3" />,
    prompt: "Necesito la guía de la dobladora de ferralla"
  },
  {
    id: "mantenimiento",
    label: "Mantenimiento",
    icon: <AlertTriangle className="h-3 w-3" />,
    prompt: "¿Cuál es el plan de mantenimiento recomendado?"
  },
  {
    id: "problemas",
    label: "Solución problemas",
    icon: <CheckCircle className="h-3 w-3" />,
    prompt: "La máquina no dobla correctamente, ¿qué puede ser?"
  }
]

const simulatedResponses: Record<string, string> = {
  "estribadora": `# 🔧 Manual de la Estribadora Automática MEA-3000

## Descripción General
La **Estribadora Automática MEA-3000** es una máquina de alta precisión diseñada para la fabricación de estribos de ferralla de forma automatizada.

## Especificaciones Técnicas
| Parámetro | Valor |
|-----------|-------|
| Diámetro de varilla | 6-16 mm |
| Velocidad de producción | 800-1200 estribos/hora |
| Ángulos de doblado | 0° - 180° |
| Precisión | ±0.5 mm |
| Potencia | 7.5 kW |

## Instrucciones de Operación

### 1. Encendido
1. Verificar que el área de trabajo esté despejada
2. Conectar la alimentación principal
3. Pulsar el botón **INICIO** en el panel de control
4. Esperar la secuencia de calibración (30 seg)

### 2. Configuración de Programa
1. Seleccionar el tipo de estribo en la pantalla táctil
2. Introducir las dimensiones requeridas
3. Configurar el número de unidades
4. Pulsar **VALIDAR** para confirmar

### 3. Carga de Material
1. Insertar la varilla en el alimentador
2. Asegurar que el extremo esté correctamente posicionado
3. El sensor confirmará la detección del material

### ⚠️ Precauciones de Seguridad
- Usar siempre guantes de protección
- No introducir las manos en la zona de doblado
- Mantener la parada de emergencia accesible`,

  "dobladora": `# 📘 Guía de la Dobladora de Ferralla DF-500

## Características Principales
La **Dobladora DF-500** permite realizar doblados precisos en barras de acero para construcción.

## Panel de Control
\`\`\`
┌─────────────────────────────────┐
│  [ÁNGULO]  [LONGITUD]  [CICLOS] │
│   ___°      ___mm      ___     │
│                                 │
│  [AUTO]  [MANUAL]  [CONFIG]    │
│                                 │
│     [▶ INICIAR]  [⬛ PARAR]    │
└─────────────────────────────────┘
\`\`\`

## Modos de Operación

### Modo Automático
- Ejecuta programas predefinidos
- Ideal para producción en serie
- Cambio rápido entre programas

### Modo Manual
- Control directo del operador
- Para piezas especiales o prototipos
- Ajuste fino de parámetros

## Programas Preconfigurados
1. **EST-90**: Estribo estándar 90°
2. **EST-135**: Estribo con gancho 135°
3. **CERCO-4L**: Cerco de 4 lados
4. **GANCHO-STD**: Gancho estándar ACI

## Tabla de Velocidades Recomendadas
| Diámetro | Velocidad | Fuerza |
|----------|-----------|--------|
| 6 mm | Alta | Baja |
| 10 mm | Media | Media |
| 16 mm | Baja | Alta |
| 20 mm | Muy baja | Máxima |`,

  "mantenimiento": `# 🛠️ Plan de Mantenimiento Preventivo

## Mantenimiento Diario
- [ ] Limpieza de residuos metálicos
- [ ] Verificación de niveles de lubricante
- [ ] Inspección visual de rodillos
- [ ] Comprobación de sensores

## Mantenimiento Semanal
- [ ] Lubricación de guías lineales
- [ ] Ajuste de tensión de correas
- [ ] Limpieza de filtros de aire
- [ ] Verificación de conexiones eléctricas

## Mantenimiento Mensual
- [ ] Cambio de aceite hidráulico
- [ ] Calibración de encoders
- [ ] Revisión de desgaste de matrices
- [ ] Backup de programas

## Indicadores de Desgaste
| Componente | Vida útil | Señales de desgaste |
|------------|-----------|---------------------|
| Rodillos | 50,000 ciclos | Marcas en varilla |
| Matrices | 30,000 ciclos | Ángulos imprecisos |
| Correas | 12 meses | Grietas visibles |
| Sensores | 24 meses | Lecturas erráticas |

## Códigos de Error Comunes
- **E001**: Sobrecalentamiento motor → Dejar enfriar 15 min
- **E002**: Atasco de material → Revisar alimentador
- **E003**: Fallo sensor → Limpiar o reemplazar
- **E004**: Presión baja → Verificar sistema hidráulico`,

  "problemas": `# 🔍 Guía de Solución de Problemas

## Problema: La máquina no dobla correctamente

### Diagnóstico Rápido

#### 1. Verificar Ángulo de Doblado
**Síntoma**: El ángulo no es el esperado
**Posibles causas**:
- Desgaste en las matrices de doblado
- Descalibración del encoder
- Material fuera de especificaciones

**Solución**:
1. Medir el ángulo real vs programado
2. Si diferencia > 2°, recalibrar encoder
3. Verificar diámetro real de la varilla

#### 2. Verificar Posicionamiento
**Síntoma**: Las medidas no coinciden
**Posibles causas**:
- Deslizamiento en rodillos de arrastre
- Sensor de longitud sucio
- Desgaste en sistema de tracción

**Solución**:
1. Limpiar rodillos con desengrasante
2. Ajustar presión de arrastre
3. Verificar estado de rodillos

#### 3. Verificar Material
**Síntoma**: Doblado irregular o con grietas
**Posibles causas**:
- Acero de mala calidad
- Diámetro incorrecto
- Material oxidado

**Solución**:
1. Verificar certificado del material
2. Medir diámetro con calibre
3. Usar material limpio

## ¿Sigue el problema?
Si después de estas verificaciones el problema persiste, contacte con el servicio técnico:
📞 **900 123 456** (24h)
📧 **soporte@tecozam.com**`
}

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("estribadora") || lowerMessage.includes("estribos automát")) {
    return simulatedResponses["estribadora"]
  }
  if (lowerMessage.includes("dobladora") || lowerMessage.includes("guía") || lowerMessage.includes("guia")) {
    return simulatedResponses["dobladora"]
  }
  if (lowerMessage.includes("mantenimiento") || lowerMessage.includes("preventivo")) {
    return simulatedResponses["mantenimiento"]
  }
  if (lowerMessage.includes("problema") || lowerMessage.includes("no dobla") || lowerMessage.includes("error") || lowerMessage.includes("fallo")) {
    return simulatedResponses["problemas"]
  }

  return `Entiendo tu consulta sobre "${message}".

Puedo ayudarte con información sobre:

1. **Estribadora Automática MEA-3000** - Manual completo de operación
2. **Dobladora de Ferralla DF-500** - Guía de uso y programación
3. **Plan de Mantenimiento** - Preventivo y correctivo
4. **Solución de Problemas** - Diagnóstico y reparación

¿Sobre cuál de estos temas te gustaría más información?`
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! Soy el asistente técnico de Tecozam. Puedo ayudarte con información sobre nuestras máquinas de ferralla:\n\n- **Estribadora Automática MEA-3000**\n- **Dobladora de Ferralla DF-500**\n\n¿En qué puedo ayudarte hoy?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

    const response = getResponse(messageText)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date()
    }

    setIsTyping(false)
    setMessages(prev => [...prev, assistantMessage])
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSend(action.prompt)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              <Bot className="h-6 w-6" />
            </Button>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "600px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="h-8 w-8" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-primary" />
                </div>
                <div>
                  <div className="font-semibold">Asistente Tecozam</div>
                  <div className="text-xs opacity-80">Soporte técnico 24/7</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
                            {message.content.split('\n').map((line, i) => {
                              // Simple markdown-like rendering
                              if (line.startsWith('# ')) {
                                return <h3 key={i} className="text-base font-bold mt-2 mb-1">{line.slice(2)}</h3>
                              }
                              if (line.startsWith('## ')) {
                                return <h4 key={i} className="text-sm font-semibold mt-2 mb-1">{line.slice(3)}</h4>
                              }
                              if (line.startsWith('### ')) {
                                return <h5 key={i} className="text-sm font-medium mt-1">{line.slice(4)}</h5>
                              }
                              if (line.startsWith('- [ ]')) {
                                return <div key={i} className="flex items-center gap-2 ml-2"><input type="checkbox" disabled /><span>{line.slice(6)}</span></div>
                              }
                              if (line.startsWith('- ') || line.startsWith('* ')) {
                                return <div key={i} className="ml-2">• {line.slice(2)}</div>
                              }
                              if (line.match(/^\d+\./)) {
                                return <div key={i} className="ml-2">{line}</div>
                              }
                              if (line.startsWith('|')) {
                                return <div key={i} className="font-mono text-xs">{line}</div>
                              }
                              if (line.startsWith('```')) {
                                return null
                              }
                              // Bold text
                              const boldParsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              return <div key={i} dangerouslySetInnerHTML={{ __html: boldParsed }} />
                            })}
                          </div>
                          <div className={`text-[10px] mt-1 ${message.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                            {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-1">
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-2 h-2 bg-foreground/60 rounded-full"
                            />
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-foreground/60 rounded-full"
                            />
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              className="w-2 h-2 bg-foreground/60 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Actions */}
                <div className="p-2 border-t bg-muted/30">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        className="shrink-0 text-xs h-7 gap-1"
                        onClick={() => handleQuickAction(action)}
                      >
                        {action.icon}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-3 border-t">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Escribe tu consulta..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
