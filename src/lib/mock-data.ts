// Mock data for the dashboard demo

export interface Incident {
  id: string;
  caller: string;
  phone: string;
  vehicle: {
    brand: string;
    model: string;
    plate: string;
    year: number;
  };
  issue: string;
  issueType: "accidente" | "averia" | "mantenimiento" | "revision";
  location: string;
  status: "llamada_recibida" | "procesando" | "enviado_talleres" | "esperando_respuesta" | "cita_confirmada" | "resuelto";
  createdAt: string;
  updatedAt: string;
  assignedWorkshop?: string;
  appointmentDate?: string;
  priority: "alta" | "media" | "baja";
}

export interface Workshop {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  specialties: string[];
  rating: number;
  responseTime: number; // minutes
  activeIncidents: number;
  status: "disponible" | "ocupado" | "cerrado";
}

export interface Communication {
  id: string;
  incidentId: string;
  type: "email_enviado" | "email_recibido" | "llamada_entrante" | "llamada_saliente" | "sms";
  from: string;
  to: string;
  subject?: string;
  content: string;
  timestamp: string;
  status: "enviado" | "entregado" | "leido" | "respondido" | "fallido";
}

export const incidents: Incident[] = [
  {
    id: "INC-001",
    caller: "María García López",
    phone: "+34 612 345 678",
    vehicle: { brand: "Volkswagen", model: "Golf", plate: "1234 ABC", year: 2021 },
    issue: "Golpe en el parachoques trasero por alcance en semáforo",
    issueType: "accidente",
    location: "Calle Mayor 45, Madrid",
    status: "cita_confirmada",
    createdAt: "2025-01-20T09:15:00",
    updatedAt: "2025-01-20T10:30:00",
    assignedWorkshop: "Taller AutoExpress",
    appointmentDate: "2025-01-22T10:00:00",
    priority: "alta"
  },
  {
    id: "INC-002",
    caller: "Carlos Rodríguez",
    phone: "+34 623 456 789",
    vehicle: { brand: "Seat", model: "León", plate: "5678 DEF", year: 2020 },
    issue: "Motor no arranca, posible fallo en batería",
    issueType: "averia",
    location: "Av. de la Constitución 12, Sevilla",
    status: "enviado_talleres",
    createdAt: "2025-01-20T10:45:00",
    updatedAt: "2025-01-20T10:50:00",
    priority: "alta"
  },
  {
    id: "INC-003",
    caller: "Ana Martínez",
    phone: "+34 634 567 890",
    vehicle: { brand: "Toyota", model: "Corolla", plate: "9012 GHI", year: 2019 },
    issue: "Revisión de los 60.000 km programada",
    issueType: "revision",
    location: "Plaza España 8, Barcelona",
    status: "esperando_respuesta",
    createdAt: "2025-01-20T08:00:00",
    updatedAt: "2025-01-20T09:00:00",
    priority: "baja"
  },
  {
    id: "INC-004",
    caller: "Pedro Sánchez García",
    phone: "+34 645 678 901",
    vehicle: { brand: "Ford", model: "Focus", plate: "3456 JKL", year: 2022 },
    issue: "Ruido extraño en la dirección al girar",
    issueType: "averia",
    location: "Calle Gran Vía 102, Valencia",
    status: "procesando",
    createdAt: "2025-01-20T11:20:00",
    updatedAt: "2025-01-20T11:22:00",
    priority: "media"
  },
  {
    id: "INC-005",
    caller: "Laura Fernández",
    phone: "+34 656 789 012",
    vehicle: { brand: "Renault", model: "Clio", plate: "7890 MNO", year: 2023 },
    issue: "Cambio de aceite y filtros",
    issueType: "mantenimiento",
    location: "Av. Diagonal 250, Barcelona",
    status: "resuelto",
    createdAt: "2025-01-19T14:00:00",
    updatedAt: "2025-01-20T08:00:00",
    assignedWorkshop: "Taller Rápido BCN",
    appointmentDate: "2025-01-20T08:00:00",
    priority: "baja"
  },
  {
    id: "INC-006",
    caller: "Miguel Ángel Torres",
    phone: "+34 667 890 123",
    vehicle: { brand: "Peugeot", model: "308", plate: "2345 PQR", year: 2020 },
    issue: "Colisión lateral en parking",
    issueType: "accidente",
    location: "Centro Comercial La Vaguada, Madrid",
    status: "llamada_recibida",
    createdAt: "2025-01-20T11:35:00",
    updatedAt: "2025-01-20T11:35:00",
    priority: "alta"
  },
  {
    id: "INC-007",
    caller: "Isabel Ruiz",
    phone: "+34 678 901 234",
    vehicle: { brand: "Hyundai", model: "Tucson", plate: "6789 STU", year: 2021 },
    issue: "Luz de motor encendida en el tablero",
    issueType: "averia",
    location: "Calle Serrano 45, Madrid",
    status: "cita_confirmada",
    createdAt: "2025-01-20T07:30:00",
    updatedAt: "2025-01-20T09:45:00",
    assignedWorkshop: "Hyundai Oficial Madrid",
    appointmentDate: "2025-01-21T09:00:00",
    priority: "media"
  },
  {
    id: "INC-008",
    caller: "Javier López",
    phone: "+34 689 012 345",
    vehicle: { brand: "BMW", model: "Serie 3", plate: "0123 VWX", year: 2022 },
    issue: "Neumático pinchado en autopista",
    issueType: "averia",
    location: "A-6 km 45, Madrid",
    status: "resuelto",
    createdAt: "2025-01-19T16:00:00",
    updatedAt: "2025-01-19T18:30:00",
    assignedWorkshop: "Asistencia en Carretera 24h",
    priority: "alta"
  }
];

export const workshops: Workshop[] = [
  {
    id: "WS-001",
    name: "Taller AutoExpress",
    address: "Polígono Industrial Norte, Nave 12",
    city: "Madrid",
    phone: "+34 91 123 4567",
    email: "contacto@autoexpress.es",
    specialties: ["Chapa y pintura", "Mecánica general", "Electricidad"],
    rating: 4.8,
    responseTime: 15,
    activeIncidents: 3,
    status: "disponible"
  },
  {
    id: "WS-002",
    name: "Taller Rápido BCN",
    address: "Calle Industria 45",
    city: "Barcelona",
    phone: "+34 93 234 5678",
    email: "info@rapidobcn.com",
    specialties: ["Mantenimiento", "Revisiones ITV", "Neumáticos"],
    rating: 4.5,
    responseTime: 20,
    activeIncidents: 2,
    status: "disponible"
  },
  {
    id: "WS-003",
    name: "Hyundai Oficial Madrid",
    address: "Av. de la Industria 100",
    city: "Madrid",
    phone: "+34 91 345 6789",
    email: "servicio@hyundaimadrid.es",
    specialties: ["Servicio oficial Hyundai", "Garantías", "Diagnosis"],
    rating: 4.9,
    responseTime: 30,
    activeIncidents: 5,
    status: "ocupado"
  },
  {
    id: "WS-004",
    name: "CarFix Valencia",
    address: "Polígono Fuente del Jarro, Parcela 8",
    city: "Valencia",
    phone: "+34 96 456 7890",
    email: "valencia@carfix.es",
    specialties: ["Mecánica general", "Aire acondicionado", "Frenos"],
    rating: 4.6,
    responseTime: 25,
    activeIncidents: 1,
    status: "disponible"
  },
  {
    id: "WS-005",
    name: "Asistencia en Carretera 24h",
    address: "Base Central - M40",
    city: "Madrid",
    phone: "+34 900 123 456",
    email: "urgencias@asistencia24h.es",
    specialties: ["Grúa", "Asistencia en carretera", "Neumáticos"],
    rating: 4.7,
    responseTime: 10,
    activeIncidents: 4,
    status: "disponible"
  },
  {
    id: "WS-006",
    name: "Talleres Sevilla Sur",
    address: "Calle Torneo 78",
    city: "Sevilla",
    phone: "+34 95 567 8901",
    email: "info@sevillasur.com",
    specialties: ["Multimarca", "Chapa y pintura", "Electricidad"],
    rating: 4.4,
    responseTime: 35,
    activeIncidents: 2,
    status: "disponible"
  }
];

export const communications: Communication[] = [
  {
    id: "COM-001",
    incidentId: "INC-001",
    type: "llamada_entrante",
    from: "+34 612 345 678",
    to: "Centralita",
    content: "Transcripción: Cliente reporta golpe en parachoques trasero. Vehículo: VW Golf 2021, matrícula 1234 ABC. Ubicación: Calle Mayor 45, Madrid. Solicita cita para reparación lo antes posible.",
    timestamp: "2025-01-20T09:15:00",
    status: "respondido"
  },
  {
    id: "COM-002",
    incidentId: "INC-001",
    type: "email_enviado",
    from: "centralita@tecozam.com",
    to: "contacto@autoexpress.es",
    subject: "Nueva solicitud de reparación - INC-001",
    content: "Nuevo incidente requiere atención. Vehículo: VW Golf 2021 (1234 ABC). Daño: Parachoques trasero. Por favor, confirme disponibilidad y proporcione cita.",
    timestamp: "2025-01-20T09:20:00",
    status: "entregado"
  },
  {
    id: "COM-003",
    incidentId: "INC-001",
    type: "email_recibido",
    from: "contacto@autoexpress.es",
    to: "centralita@tecozam.com",
    subject: "RE: Nueva solicitud de reparación - INC-001",
    content: "Confirmamos disponibilidad. Cita asignada: 22 de enero a las 10:00. Presupuesto estimado: 450€. Tiempo de reparación: 2 días.",
    timestamp: "2025-01-20T10:15:00",
    status: "leido"
  },
  {
    id: "COM-004",
    incidentId: "INC-001",
    type: "sms",
    from: "Centralita",
    to: "+34 612 345 678",
    content: "Su cita ha sido confirmada: Taller AutoExpress, 22/01 a las 10:00. Dirección: Polígono Industrial Norte, Nave 12, Madrid.",
    timestamp: "2025-01-20T10:30:00",
    status: "entregado"
  },
  {
    id: "COM-005",
    incidentId: "INC-002",
    type: "llamada_entrante",
    from: "+34 623 456 789",
    to: "Centralita",
    content: "Transcripción: El motor no arranca. Posible fallo de batería. Vehículo: Seat León 2020, matrícula 5678 DEF. Cliente en Av. de la Constitución 12, Sevilla.",
    timestamp: "2025-01-20T10:45:00",
    status: "respondido"
  },
  {
    id: "COM-006",
    incidentId: "INC-002",
    type: "email_enviado",
    from: "centralita@tecozam.com",
    to: "info@sevillasur.com",
    subject: "Solicitud urgente - INC-002",
    content: "Incidente urgente: Vehículo no arranca. Seat León 2020. Posible fallo de batería. Cliente esperando en ubicación. Necesita asistencia inmediata.",
    timestamp: "2025-01-20T10:50:00",
    status: "enviado"
  }
];

// KPI calculations
export const getKPIs = () => {
  const today = new Date().toISOString().split('T')[0];
  const todayIncidents = incidents.filter(i => i.createdAt.startsWith('2025-01-20'));

  return {
    totalIncidents: incidents.length,
    activeIncidents: incidents.filter(i => !["resuelto"].includes(i.status)).length,
    resolvedToday: incidents.filter(i => i.status === "resuelto" && i.updatedAt.startsWith('2025-01-20')).length,
    avgResponseTime: 18, // minutes (mock)
    workshopsActive: workshops.filter(w => w.status !== "cerrado").length,
    pendingAppointments: incidents.filter(i => i.status === "cita_confirmada").length,
    callsProcessedToday: todayIncidents.length,
    successRate: 94.5 // percentage
  };
};

// Status labels in Spanish
export const statusLabels: Record<Incident["status"], string> = {
  llamada_recibida: "Llamada Recibida",
  procesando: "Procesando",
  enviado_talleres: "Enviado a Talleres",
  esperando_respuesta: "Esperando Respuesta",
  cita_confirmada: "Cita Confirmada",
  resuelto: "Resuelto"
};

export const statusColors: Record<Incident["status"], string> = {
  llamada_recibida: "bg-blue-500",
  procesando: "bg-yellow-500",
  enviado_talleres: "bg-purple-500",
  esperando_respuesta: "bg-orange-500",
  cita_confirmada: "bg-green-500",
  resuelto: "bg-gray-500"
};

export const priorityLabels: Record<Incident["priority"], string> = {
  alta: "Alta",
  media: "Media",
  baja: "Baja"
};

export const priorityColors: Record<Incident["priority"], string> = {
  alta: "bg-red-500",
  media: "bg-yellow-500",
  baja: "bg-green-500"
};

// Chart data
export const callsPerDayData = [
  { date: "Lun", calls: 45, resolved: 42 },
  { date: "Mar", calls: 52, resolved: 48 },
  { date: "Mié", calls: 38, resolved: 35 },
  { date: "Jue", calls: 61, resolved: 58 },
  { date: "Vie", calls: 55, resolved: 52 },
  { date: "Sáb", calls: 28, resolved: 26 },
  { date: "Dom", calls: 15, resolved: 14 }
];

export const incidentsByTypeData = [
  { type: "Accidentes", count: 35, fill: "var(--color-chart-1)" },
  { type: "Averías", count: 45, fill: "var(--color-chart-2)" },
  { type: "Mantenimiento", count: 28, fill: "var(--color-chart-3)" },
  { type: "Revisiones", count: 22, fill: "var(--color-chart-4)" }
];

export const responseTimeData = [
  { hour: "8:00", time: 12 },
  { hour: "9:00", time: 15 },
  { hour: "10:00", time: 18 },
  { hour: "11:00", time: 22 },
  { hour: "12:00", time: 20 },
  { hour: "13:00", time: 16 },
  { hour: "14:00", time: 14 },
  { hour: "15:00", time: 17 },
  { hour: "16:00", time: 21 },
  { hour: "17:00", time: 19 },
  { hour: "18:00", time: 15 }
];

// Calls data with transcriptions
export interface Call {
  id: string;
  incidentId: string;
  phone: string;
  callerName: string;
  duration: number; // seconds
  timestamp: string;
  status: "en_curso" | "completada" | "perdida" | "en_espera";
  direction: "entrante" | "saliente";
  transcription?: string;
  extractedData?: {
    vehicle?: string;
    plate?: string;
    issue?: string;
    location?: string;
  };
  sentiment?: "positivo" | "neutral" | "negativo";
}

export const calls: Call[] = [
  {
    id: "CALL-001",
    incidentId: "INC-001",
    phone: "+34 612 345 678",
    callerName: "María García López",
    duration: 185,
    timestamp: "2025-01-20T09:15:00",
    status: "completada",
    direction: "entrante",
    transcription: `[00:00] Sistema: Bienvenido a Tecozam, centralita de incidentes. ¿En qué puedo ayudarle?

[00:05] Cliente: Hola, buenos días. He tenido un pequeño accidente y necesito que me ayuden.

[00:12] Sistema: Entendido, ¿puede indicarme qué ha ocurrido?

[00:16] Cliente: Pues mire, estaba parada en un semáforo y el coche de atrás me ha dado un golpe. No es muy grave pero el parachoques trasero está dañado.

[00:28] Sistema: Lamento escuchar eso. ¿Hay algún herido?

[00:32] Cliente: No, no, estamos todos bien, solo el susto.

[00:36] Sistema: Me alegro. ¿Puede facilitarme los datos de su vehículo? Marca, modelo y matrícula.

[00:42] Cliente: Sí, es un Volkswagen Golf del 2021, matrícula 1234 ABC.

[00:50] Sistema: Perfecto. ¿Dónde se encuentra actualmente?

[00:54] Cliente: En la Calle Mayor número 45, en Madrid.

[01:00] Sistema: Muy bien, María. He registrado su incidente. Vamos a contactar con talleres cercanos para ofrecerle una cita lo antes posible. ¿Tiene alguna preferencia de horario?

[01:15] Cliente: Por las mañanas me vendría mejor, si es posible.

[01:20] Sistema: Tomamos nota. Recibirá un SMS con la confirmación de la cita. ¿Algo más en lo que pueda ayudarle?

[01:28] Cliente: No, eso es todo. Muchas gracias.

[01:32] Sistema: Gracias a usted. Que tenga un buen día.`,
    extractedData: {
      vehicle: "Volkswagen Golf 2021",
      plate: "1234 ABC",
      issue: "Golpe en parachoques trasero",
      location: "Calle Mayor 45, Madrid"
    },
    sentiment: "neutral"
  },
  {
    id: "CALL-002",
    incidentId: "INC-002",
    phone: "+34 623 456 789",
    callerName: "Carlos Rodríguez",
    duration: 142,
    timestamp: "2025-01-20T10:45:00",
    status: "completada",
    direction: "entrante",
    transcription: `[00:00] Sistema: Bienvenido a Tecozam. ¿En qué puedo ayudarle?

[00:04] Cliente: ¡Hola! Tengo un problema urgente, mi coche no arranca.

[00:09] Sistema: Entiendo. ¿Puede describir qué ocurre cuando intenta arrancarlo?

[00:14] Cliente: Pues giro la llave y hace un ruido como de clic clic pero no enciende. Creo que puede ser la batería.

[00:24] Sistema: Es posible. ¿Cuánto tiempo lleva el vehículo sin usarse?

[00:28] Cliente: Lo usé ayer sin problemas, pero esta mañana nada.

[00:34] Sistema: ¿Dejó alguna luz encendida anoche?

[00:38] Cliente: Ahora que lo dice... puede que dejara las luces de posición. ¡Vaya!

[00:45] Sistema: No se preocupe, ocurre frecuentemente. ¿Puede darme los datos del vehículo?

[00:50] Cliente: Es un Seat León del 2020, matrícula 5678 DEF.

[00:58] Sistema: ¿Y dónde se encuentra?

[01:02] Cliente: En la Avenida de la Constitución número 12, en Sevilla.

[01:10] Sistema: Perfecto, Carlos. Vamos a enviar su solicitud a talleres con servicio de asistencia en carretera. Le contactaremos en breve.

[01:22] Cliente: Muchas gracias, es urgente porque tengo que ir a trabajar.`,
    extractedData: {
      vehicle: "Seat León 2020",
      plate: "5678 DEF",
      issue: "Motor no arranca - posible batería",
      location: "Av. de la Constitución 12, Sevilla"
    },
    sentiment: "negativo"
  },
  {
    id: "CALL-003",
    incidentId: "INC-006",
    phone: "+34 667 890 123",
    callerName: "Miguel Ángel Torres",
    duration: 0,
    timestamp: "2025-01-20T11:35:00",
    status: "en_curso",
    direction: "entrante",
    transcription: `[00:00] Sistema: Bienvenido a Tecozam. ¿En qué puedo ayudarle?

[00:05] Cliente: Hola, acabo de tener un golpe en el parking del centro comercial...

[En curso - Procesando transcripción...]`,
    extractedData: {
      vehicle: "Peugeot 308 2020",
      plate: "2345 PQR",
      issue: "Colisión en parking",
      location: "Centro Comercial La Vaguada, Madrid"
    },
    sentiment: "negativo"
  },
  {
    id: "CALL-004",
    incidentId: "INC-003",
    phone: "+34 634 567 890",
    callerName: "Ana Martínez",
    duration: 95,
    timestamp: "2025-01-20T08:00:00",
    status: "completada",
    direction: "entrante",
    transcription: `[00:00] Sistema: Bienvenido a Tecozam. ¿En qué puedo ayudarle?

[00:04] Cliente: Buenos días, llamo para programar la revisión de los 60.000 kilómetros de mi coche.

[00:12] Sistema: Por supuesto. ¿Puede indicarme los datos del vehículo?

[00:16] Cliente: Es un Toyota Corolla del 2019, matrícula 9012 GHI.

[00:24] Sistema: Perfecto. ¿Tiene alguna preferencia de fecha?

[00:28] Cliente: La semana que viene si es posible, cualquier día me viene bien.

[00:35] Sistema: Muy bien, Ana. Contactaremos con talleres Toyota en su zona y le enviaremos las opciones disponibles.

[00:45] Cliente: Estupendo, muchas gracias.`,
    extractedData: {
      vehicle: "Toyota Corolla 2019",
      plate: "9012 GHI",
      issue: "Revisión 60.000 km",
      location: "Plaza España 8, Barcelona"
    },
    sentiment: "positivo"
  },
  {
    id: "CALL-005",
    incidentId: "",
    phone: "+34 699 111 222",
    callerName: "Desconocido",
    duration: 0,
    timestamp: "2025-01-20T11:40:00",
    status: "en_espera",
    direction: "entrante",
    sentiment: "neutral"
  }
];

// Appointments data
export interface Appointment {
  id: string;
  incidentId: string;
  workshopId: string;
  workshopName: string;
  clientName: string;
  clientPhone: string;
  vehicle: string;
  plate: string;
  service: string;
  date: string;
  time: string;
  duration: number; // estimated minutes
  status: "programada" | "confirmada" | "en_curso" | "completada" | "cancelada" | "no_show";
  estimatedCost?: number;
  notes?: string;
}

export const appointments: Appointment[] = [
  {
    id: "APT-001",
    incidentId: "INC-001",
    workshopId: "WS-001",
    workshopName: "Taller AutoExpress",
    clientName: "María García López",
    clientPhone: "+34 612 345 678",
    vehicle: "Volkswagen Golf 2021",
    plate: "1234 ABC",
    service: "Reparación parachoques trasero",
    date: "2025-01-22",
    time: "10:00",
    duration: 180,
    status: "confirmada",
    estimatedCost: 450,
    notes: "Cliente prefiere horario de mañana"
  },
  {
    id: "APT-002",
    incidentId: "INC-007",
    workshopId: "WS-003",
    workshopName: "Hyundai Oficial Madrid",
    clientName: "Isabel Ruiz",
    clientPhone: "+34 678 901 234",
    vehicle: "Hyundai Tucson 2021",
    plate: "6789 STU",
    service: "Diagnóstico luz de motor",
    date: "2025-01-21",
    time: "09:00",
    duration: 60,
    status: "confirmada",
    estimatedCost: 80,
    notes: "Posible fallo en sensor"
  },
  {
    id: "APT-003",
    incidentId: "INC-005",
    workshopId: "WS-002",
    workshopName: "Taller Rápido BCN",
    clientName: "Laura Fernández",
    clientPhone: "+34 656 789 012",
    vehicle: "Renault Clio 2023",
    plate: "7890 MNO",
    service: "Cambio aceite y filtros",
    date: "2025-01-20",
    time: "08:00",
    duration: 45,
    status: "completada",
    estimatedCost: 120
  },
  {
    id: "APT-004",
    incidentId: "",
    workshopId: "WS-004",
    workshopName: "CarFix Valencia",
    clientName: "Roberto Jiménez",
    clientPhone: "+34 677 888 999",
    vehicle: "Opel Astra 2020",
    plate: "4567 XYZ",
    service: "Revisión aire acondicionado",
    date: "2025-01-21",
    time: "11:30",
    duration: 90,
    status: "programada",
    estimatedCost: 150
  },
  {
    id: "APT-005",
    incidentId: "",
    workshopId: "WS-001",
    workshopName: "Taller AutoExpress",
    clientName: "Carmen López",
    clientPhone: "+34 655 444 333",
    vehicle: "Audi A4 2022",
    plate: "8901 BCD",
    service: "Cambio de pastillas de freno",
    date: "2025-01-22",
    time: "16:00",
    duration: 120,
    status: "confirmada",
    estimatedCost: 280
  },
  {
    id: "APT-006",
    incidentId: "",
    workshopId: "WS-006",
    workshopName: "Talleres Sevilla Sur",
    clientName: "Antonio Martín",
    clientPhone: "+34 622 333 444",
    vehicle: "Citroën C4 2019",
    plate: "2345 EFG",
    service: "Reparación chapa lateral",
    date: "2025-01-23",
    time: "09:30",
    duration: 240,
    status: "programada",
    estimatedCost: 600,
    notes: "Requiere pieza de recambio - confirmar disponibilidad"
  },
  {
    id: "APT-007",
    incidentId: "",
    workshopId: "WS-002",
    workshopName: "Taller Rápido BCN",
    clientName: "Elena Gómez",
    clientPhone: "+34 633 222 111",
    vehicle: "Nissan Qashqai 2021",
    plate: "6789 HIJ",
    service: "ITV + Pre-ITV",
    date: "2025-01-20",
    time: "12:00",
    duration: 60,
    status: "en_curso",
    estimatedCost: 95
  }
];
