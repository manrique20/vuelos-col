import type { Ref } from 'vue'
import { watch, computed } from 'vue'
import debounce from 'lodash/debounce'

type Options = {
  exclude?: string[]
  debounceMs?: number
}

export function useFilteredWatch(
  form: Ref<Record<string, any>>,
  getList: () => Promise<void>,
  options: Options = {},
) {
  const resetOffsetKey = 'offset'
  const { exclude = ['offset', 'limit'], debounceMs = 500 } = options

  // Creamos un computed que accede a cada propiedad individual (para reactividad)
  const watchableForm = computed(() => {
    const clone: Record<string, any> = {}
    for (const key in form.value) {
      if (!exclude.includes(key)) {
        clone[key] = form.value[key] // esto crea la reactividad por propiedad
      }
    }
    return JSON.stringify(clone)
  })

  watch(
    watchableForm,
    debounce(async () => {
      if (
        resetOffsetKey &&
        form.value[resetOffsetKey] !== undefined &&
        form.value[resetOffsetKey] !== 0
      ) {
        form.value[resetOffsetKey] = 0
      }
      await getList()
    }, debounceMs),
  )
}

export const validateFormData = (form: Ref<Record<string, any>>) => {
  const exclude = ['offset', 'limit']

  const isFormChanged = computed(() => {
    return Object.entries(form.value).some(([key, value]) => {
      if (exclude.includes(key)) return false
      return value !== '' && value !== null && value !== undefined
    })
  })

  return isFormChanged
}
