export default {
  application: "Stack Front",
  loading: "Cargando, por favor espere...",
  rol: {
    admin: "Administrador",
    ops: "Operador",
  },
  title: {
    welcome: "Bienvenido",
    login: "Iniciar sesión",
    forgotPassword: "Recuperar contraseña",
    validateCode: "Recuperar contraseña",
    changePassword: "Restablecer contraseña",
    logout: "¿Estás seguro de querer cerrar la sesión?",
  },
  form: {
    origin:{
      label: "Ciudad de origen",
      placeholder: "Seleccione"
    },
    destination: {
      label: "Ciudad de destino",
      placeholder: "Seleccione"
    },
    selectedFlight: {
      label: "Vuelo seleccionado",
      placeholder: "Seleccione un vuelo"
    },
    departureDate: {
      label: "Fecha de salida",
      placeholder: "Seleccione una fecha"
    },
    arrivalDate: {
      label: "Fecha de regreso",
      placeholder: "Seleccione una fecha"
    },
    seats: {
      label: "Asientos",
      placeholder: "Seleccione la cantidad de asientos"
    },
    card: {
      label: "Datos de tarjeta",
      number: "Número de tarjeta",
      holder: "Nombre del titular",
      expiration: "Fecha de expiración",
      cvv: "CVV",
    },
    price: 'Precio final',
    fullname: {
      label: "Nombre completo",
      placeholder: "Escriba su nombre completo",
    },
    name: {
      label: "Nombre",
      placeholder: "Escriba su nombre",
    },
    surname: {
      label: "Apellido",
      placeholder: "Escriba su apellido",
    },
    document: {
      label: "Tipo y número de documento",
      placeholder: "Seleccione y escriba el tipo y número de documento",
    },
    phone: {
      label: "Número de celular",
      placeholder: "Escriba su número de celular",
    },
    email: {
      label: "Email",
      placeholder: "Escribir su correo electrónico",
    },
    password: {
      label: "Contraseña",
      placeholder: "Escribir contraseña",
      tooltip:
        "La contraseña debe contener al menos una minúscula, una mayúscula y un número",
    },
    currentPassword: {
      label: "Contraseña actual",
      placeholder: "Escribir contraseña actual",
    },
    passwordNew: {
      label: "Nueva contraseña",
    },
    confirmPassword: {
      label: "Repetir nueva contraseña",
      placeholder: "Repetir Contraseña",
    },
  },
  home: {
    title: "Tipos de vehículos",
    found: "Vehículos encontrados",
  },
  registry: {
    firstStep: {
      title: "Registrate",
      description:
        "Ingresa los datos necesarios para completar tu registro y ser parte de Vuelos Col! Cada vez mas cerca de cumplir tus sueños.",
    },
  },

  button: {
    login: "Iniciar sesión",
    cancel: "Cancelar",
    back: "Volver",
    register: "Registar",
    logout: "Cerrar sesión",
    continue: "Continuar",
    search: "Buscar",
  },
  rule: {
    form: "Por favor revisa la información",
    image: "Debe seleccionar una imagen",
    validation: {
      require: "El dato es requerido para continuar",
      requireEmail: "El correo es requerido para continuar",
      value: {
        min: "Debe ser mayor o igual a {data}",
        max: "Debe ser inferior o igual a {data}",
      },
      length: {
        min: "Debe contener al menos {data} carácteres",
        max: "No puede contener más de {data} carácteres",
      },
      email: "Debe ser una dirección de correo válida",
      password: {
        valid: "Mín. 8 caracteres alfanuméricos: 1 mayúscula, 1 minúscula",
        confirm: "Las contraseñas deben coincidir",
      },
      card: {
        number: "El número de tarjeta no es válido",
        expiry: "La fecha de expiración no es válida",
        cvv: "El código CVV no es válido",
      }
    },
  },
  store: {
    apiServices: {
      sessionExpired:
        "Su sesión ha expirado, por favor inicie sesión nuevamente",
      loginRequired: "Debe ingresar sus credenciales para continuar",
      timeOut:
        "Ha tardado demasiado en responder. Intente nuevamente más tarde",
      notFound:
        "No se encontró la url solicitada. Intente nuevamente más tarde",
      generalError:
        "Ocurrió un error en el servidor. Intente nuevamente más tarde",
    },
  },
  text: {
    login: "Por favor digita tu correo electrónico",
    return: "Volver",

  },
  table: {
    empty: {
      title: "Lo sentimos",
      message: "Lamentablemente no tenemos datos que mostrar.",
    },
    loading: "Cargando... Por favor aguarde un momento",
    state: {
      title: "Estado",
      active: "Activo",
      inactive: "Inactivo",
    },
    admin: {
      name: "Nombre y correo",
      role: "Rol",
    },
    enums: {
      role: {
        administrative: "Administrativo",
        superadmin: "Super Administrador",
        operative: "Operativo",
      },
      status: {
        active: "Activo",
        inactive: "Inactivo",
      },
    },
    flight_number: 'Número de vuelo',
    origin: 'Origen',
    destination: 'Destino',
    departure_date: 'Fecha de salida',
    arrival_date: 'Fecha de regreso',
    status: 'Estado',
    aircraft: 'Aeronave',
    name: 'Nombre',
    surname: 'Apellido',
    document_number: 'Número de documento',
    flightId: 'ID de vuelo',
    userId: 'ID de usuario',
    booking_date: 'Fecha de reserva',
    seats_count: 'Cantidad de asientos',
    total_price: 'Precio total',
    price_per_seat: 'Precio por asiento',
  },
  filter: {
    filters: {
      all: "Todos",
      search: "Buscar",
      role: "Rol",
      status: "Estado",
      date: "dd-mm-aaaa ",
    },
  },
  paginator: {
    display: "Mostrar",
    entries: "Registros",
    page: "Página",
    from: "de",
    previousPage: "Anterior",
    nextPage: "Siguiente",
  },
  menu: {
    logout: "Cerrar sesión",
    searchFlights: "Buscar vuelos",
    myReservations: "Mis reservas",
    login: "Iniciar sesión",
    administrator: "Administrador",
    register: "Registrarse",
    profile: "Perfil",
    notFound: "404 - Página no encontrada",
  },
  breadcrumb: {
    vehicleList: "Buscar vehículos",
  },
};
