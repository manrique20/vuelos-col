export default {
  application: "Front Stack",
  loading: "Loading, please wait...",
  rol: {
    admin: "Administrator",
    ops: "Operator",
  },
  title: {
    welcome: "Welcome",
    login: "Sign in",
    forgotPassword: "Recover password",
    validateCode: "Recover password",
    changePassword: "Reset password",
    logout: "Are you sure you want to log out?",
    dreams: 'Getting closer to fulfilling your dreams',
  },
  form: {
    origin: {
      label: "Origin city",
      placeholder: "Select"
    },
    destination: {
      label: "Destination city",
      placeholder: "Select"
    },
    selectedFlight: {
      label: "Selected flight",
      placeholder: "Select a flight"
    },
    departureDate: {
      label: "Departure date",
      placeholder: "Select a date"
    },
    arrivalDate: {
      label: "Return date",
      placeholder: "Select a date"
    },
    seats: {
      label: "Seats",
      placeholder: "Select the number of seats"
    },
    card: {
      label: "Card details",
      number: "Card number",
      holder: "Cardholder name",
      expiration: "Expiration date",
      cvv: "CVV",
    },
    price: 'Final price',
    fullname: {
      label: "Full name",
      placeholder: "Enter your full name",
    },
    name: {
      label: "Name",
      placeholder: "Enter your name",
    },
    surname: {
      label: "Surname",
      placeholder: "Enter your surname",
    },
    document: {
      label: "Document type and number",
      placeholder: "Select and enter document type and number",
    },
    phone: {
      label: "Mobile number",
      placeholder: "Enter your mobile number",
    },
    email: {
      label: "Email",
      placeholder: "Enter your email address",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      tooltip:
        "Password must contain at least one lowercase, one uppercase and one number",
    },
    currentPassword: {
      label: "Current password",
      placeholder: "Enter current password",
    },
    passwordNew: {
      label: "New password",
    },
    confirmPassword: {
      label: "Repeat new password",
      placeholder: "Repeat password",
    },
  },
  registry: {
    firstStep: {
      title: "Sign up",
      description:
        "Enter the necessary information to complete your registration and be part of Vuelos Col! Getting closer to fulfilling your dreams.",
    },
  },
  button: {
    login: "Sign in",
    cancel: "Cancel",
    back: "Back",
    register: "Register",
    logout: "Log out",
    continue: "Continue",
    select: "Select",
    search: "Search",
    confirm: 'CONFIRM BOOKING'
  },
  rule: {
    form: "Please review the information",
    image: "You must select an image",
    validation: {
      require: "This field is required to continue",
      requireEmail: "Email is required to continue",
      date: 'Arrival date must be after or equal to departure date',
      email: "Must be a valid email address",
      password: {
        valid: "Min. 8 alphanumeric characters: 1 uppercase, 1 lowercase",
        confirm: "Passwords must match",
      },
      card: {
        number: "Card number is not valid",
        expiry: "Expiration date is not valid",
        cvv: "CVV code is not valid",
      }
    },
  },
  store: {
    apiServices: {
      sessionExpired:
        "Your session has expired, please sign in again",
      loginRequired: "You must enter your credentials to continue",
      timeOut:
        "It took too long to respond. Please try again later",
      notFound:
        "The requested URL was not found. Please try again later",
      generalError:
        "A server error occurred. Please try again later",
    },
  },
  text: {
    login: "Please enter your email address",
    return: "Return",
    form: 'Passenger data form'
  },
  table: {
    empty: {
      title: "Sorry",
      message: "Unfortunately, we have no data to display.",
    },
    loading: "Loading... Please wait a moment",
    state: {
      title: "Status",
      active: "Active",
      inactive: "Inactive",
    },
    admin: {
      name: "Name and email",
      role: "Role",
    },
    enums: {
      role: {
        administrative: "Administrative",
        superadmin: "Super Administrator",
        operative: "Operative",
      },
      status: {
        active: "Active",
        inactive: "Inactive",
        full: "Full",
      },
    },
    flight_number: 'Flight number',
    origin: 'Origin',
    destination: 'Destination',
    departure_date: 'Departure date',
    arrival_date: 'Return date',
    status: 'Status',
    aircraft: 'Aircraft',
    name: 'Name',
    surname: 'Surname',
    document_number: 'Document number',
    flightId: 'Flight ID',
    userId: 'User ID',
    booking_date: 'Booking date',
    seats_count: 'Number of seats',
    total_price: 'Total price',
    price_per_seat: 'Price per seat',
  },
  filter: {
    filters: {
      status: "Status",
    },
  },
  home: {
    availableFlights: "Available flights",
    results: "results",
    notFound: {
      1: 'No available flights found for the selected dates',
      2: 'Please try with different dates or destinations.',
    },
    availableSeats: "Available seats",
    perPerson: "per person",
  },
  menu: {
    logout: "Log out",
    searchFlights: "Search flights",
    myReservations: "My bookings",
    login: "Sign in",
    administrator: "Administrator",
    register: "Sign up",
    profile: "Profile",
    notFound: "404 - Page not found",
    greeting: "Hello",
  },
};