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
    role: {
      label: "Rol",
      placeholder: "Selecciona",
    },
    fullname: {
      label: "Nombre completo",
      placeholder: "Escriba su nombre completo",
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
    vehicleCard: {
      driverName: "Nombre del conductor",
      rating: "Calificar servicio",
      dimensions: "Dimensiones",
      dimensionsData: "Alto: {height}m, Ancho: {width}m y Largo: {large}m ",
      to: "Hasta",
      additionalMinute: "Minuto adicional",
      type: "Tipo de vehículo",
      weigth: "Peso",
      space: "Espacio",
    },
    carDetail: {
      plate: "Placa:",
      detail: "Datos del vehículo",
      greeting: "!Hola, Soy ",
      active: " activo en la aplicación",
      serviceDetail: {
        title: "Detalles del servicio:",
        min: "Mín. tiempo de servicio:",
        to: "Hasta {hours} horas / {price}",
        add: "Valor Minuto adicional:",
      },
      modal: {
        title: "Registrarme",
        description:
          "Para poder contactar a los conductores, primero debes registrarte en nuestro sistema. ¿Estás de acuerdo?",
      },
      personalDriverInfo: {
        title: "Contactar a {name}",
        message: "Número de contacto de Juan Felipe:",
      },
      conditions: "Condiciones del servicio:",
    },
  },
  registry: {
    firstStep: {
      title: "Registrate",
      description:
        "Ingresa el número de celular con el cuál quieres ser registrado en ACARREOSYA!. Enviaremos un código para validar tu identidad.",
    },
    secondStep: {
      title: "Información personal",
      description:
        "¡Bienvenido! Completa la siguiente información de tu perfil.",
    },
    thirdStep: {
      title: "Crea tu contraseña",
      description:
        "Crea tu contraseña para acceder a nuestros servicios. Recuerda que debe ser de carácter privado.",
    },
  },
  favorites: {
    table: {
      name: "Nombre del conductor",
      contactDate: "Fecha de contacto",
      vehicleType: "Tipo de vehículo",
      rating: "Calificación",
    },
    filter: {
      vehicleTypes: "Tipo de vehículo",
    },
  },
  button: {
    login: "Iniciar sesión",
    forgotPassword: "Recuperar contraseña",
    savePassword: "Guardar contraseña",
    sendCode: "Enviar código",
    resendCode: "Reenviar",
    validate: "Verificar",
    reset: "Restablecer",
    update: "Actualizar",
    cancel: "Cancelar",
    back: "Volver",
    change: "Cambiar",
    create: "Crear",
    register: "Registar",
    continue: "Continuar",
    yes: "Si, acepto",
    haveAccount: "Ya tengo cuenta",
    contact: "Contactar vehículo",
    no: "No",
    notAllow: "No permitir",
    allow: "Permitir",
    seeMore: "Ver más",
    seeInfo: "Ver información",
    logout: "Sí, salir",
    confirm: "Confirmar",
    understood: "Entendido",
    finished: "Finalizar",
    changePassword: "Cambiar contraseña",
    saveChanges: "Guardar cambios",
    whatsapp: "WhatsApp",
    phone: "Celular",
    actions: {
      created: {
        admin: "Nuevo administrador",
      },
    },
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
      number: "El dato es solo numérico",
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
    forgotPassword:
      "Ingresa un número de celular. A continuación te Enviaremos un código para validar tu identidad.",
    validateCode: "Valida tu identidad",
    validateDescription: "Ingresa el código que enviamos al número: ",
    changePassword:
      "Crea tu nueva contraseña para acceder a nuestros servicios. Recuerda que debe ser de carácter privado.",
    logout: "¿Seguro que desea cerrar sesión?",
    code: "¿Aún no recibes el código?",
    return: "Volver",
    locationModal: {
      title: "Permiso de ubicación",
      text: "Para brindarte una mejor experiencia y conectar con los conductores cercanos, necesitamos permiso para acceder a tu ubicación en tiempo real",
    },
    segs: "{data} segs",
    deniedPermitionsModal: {
      title: "Permisos de ubicación denegados",
      message:
        "Para usar esta función necesitas habilitar los permisos de ubicación en tu navegador.",
      stepsTitle: "Sigue estos pasos:",
      step1:
        "Haz clic en el ícono de candado o información en la barra de direcciones",
      step2: "Busca la opción 'Ubicación' o 'Location'",
      step3: "Cambia el permiso a 'Permitir' o 'Allow'",
      step4: "Recarga la página o haz clic en 'Verificar nuevamente'",
    },
    admins: {
      create: {
        title: "Crear admin",
      },
      edit: {
        title: "Editar admin",
      },
    },
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
