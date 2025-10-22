import Aura from '@primevue/themes/aura'
import { definePreset } from '@primeuix/themes'

export const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e5f0fa',
      100: '#cce0f5',
      200: '#99c2eb',
      300: '#66a3e0',
      400: '#3385d6',
      500: '#0f0f68',
      600: '#0b5ea0',
      700: '#09508a',
      800: '#074275',
      900: '#05355f',
      950: '#032644',
    },
  },
})
