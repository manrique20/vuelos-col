<script setup lang="ts">
const $emit = defineEmits(['page', 'update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  rows: {
    type: Number,
    required: true,
  },
  totalRecords: {
    type: Number,
    required: true,
  },
  rowsPerPageOptions: {
    type: Array as PropType<number[]>,
    default: () => [5, 10, 20],
  },
})

const { t } = useI18n()

const currentPageOffset = ref(props.modelValue) // offset 0, 1, 2...
const rowsPerPage = ref(props.rows)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.totalRecords / rowsPerPage.value)),
)

const inputPage = ref(currentPageOffset.value + 1) // visible page = offset + 1

/** Actualiza inputPage si el offset cambia desde fuera */
watch(
  () => props.modelValue,
  (newVal) => {
    currentPageOffset.value = newVal
    inputPage.value = newVal + 1
  },
)

watch(
  () => props.rows,
  (newVal) => {
    rowsPerPage.value = newVal
  },
)

watch(currentPageOffset, (newOffset) => {
  inputPage.value = newOffset + 1
  $emit('update:modelValue', newOffset)
  $emit('page', { page: newOffset, rows: rowsPerPage.value })
})

/** Cambia página por tipo: 'next' o 'prev' */
function changePage(type: 'next' | 'last') {
  if (type === 'next' && currentPageOffset.value < totalPages.value - 1) {
    currentPageOffset.value++
  }
  if (type === 'last' && currentPageOffset.value > 0) {
    currentPageOffset.value--
  }
}

/** Cuando cambia input manual del número de página */
function changeInputPage(event: any) {
  let value = Number(event?.value) || 1
  value = Math.min(Math.max(1, value), totalPages.value)
  inputPage.value = value
  currentPageOffset.value = value - 1
}

/** Cambio en el número de filas por página */
function changeRows() {
  currentPageOffset.value = 0
  $emit('page', { page: currentPageOffset.value, rows: rowsPerPage.value })
}
</script>

<template>
  <div class="paginator">
    <!-- Selección de filas por página -->
    <div class="rows-items-page">
      <div class="entries general-dropdown paginator">
        <p>{{ $t('paginator.display') }}</p>
        <Select
          v-model="rowsPerPage"
          :options="rowsPerPageOptions"
          @change="changeRows"
        >
          <template #dropdownicon>
            <i
              class="pi pi-chevron-down icon-dropdown"
              style="font-size: 12px"
            ></i>
          </template>
          <template #option="slotProps">
            <div class="paginator">
              {{ slotProps.option }}
            </div>
          </template>
        </Select>
        <p>{{ $t('paginator.entries') }}</p>
      </div>
    </div>

    <!-- Navegación por input directo -->
    <div class="middleEntries">
      <p>{{ $t('paginator.page') }}</p>
      <InputNumber
        v-model="inputPage"
        :min="1"
        :max="totalPages"
        :use-grouping="false"
        @input="changeInputPage"
      />
      <p>{{ $t('paginator.from') }} {{ totalPages }}</p>
    </div>

    <!-- Botones de navegación -->
    <div class="flex">
      <!-- Botón anterior -->
      <Button
        class="link-btn-pag prev flex tw-gap-[10px] tw-px-2"
        :class="{
          active: currentPageOffset > 0,
          disabledBack: currentPageOffset === 0,
        }"
        @click="changePage('last')"
        :disabled="currentPageOffset === 0"
      >
        <i class="pi pi-angle-left font-bold" />
        {{ $t('paginator.previousPage') }}
      </Button>
      <!-- Botón siguiente -->
      <Button
        class="link-btn-pag flex tw-gap-[10px] tw-px-3"
        :class="{
          active: currentPageOffset < totalPages - 1,
          disabledBack: currentPageOffset >= totalPages - 1,
        }"
        @click="changePage('next')"
        :disabled="currentPageOffset >= totalPages - 1"
      >
        {{ $t('paginator.nextPage') }}
        <i class="pi pi-angle-right font-bold" />
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
.paginator {
  color: $secondary;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  .p-select {
    &:not(.p-disabled).p-focus.p-select-open {
      .p-select-dropdown {
        .icon-arrow {
          content: url('/icons/table/arrow_down_white.svg');
        }
      }
    }
  }
  .entries {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 17px;
    p {
      font-family: 'app-font-medium';
      font-style: normal;
      font-size: $font-size-13;
      line-height: 17px;
      letter-spacing: 0;
      color: $color-575e6b;
      margin: 0;
    }
  }
  .middleEntries {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 17px;
    input {
      border: 1px solid $color-black-3;
      border-radius: 8px;
      width: 58px;
      height: 32px;
      font-family: 'app-font-semibold';
      color: #575e6b;
      text-align: center;
      &:hover,
      &:focus {
        border: 1px solid $color-black-3;
      }
    }
    p {
      font-family: 'app-font-medium';
      font-style: normal;
      font-size: $font-size-13;
      line-height: 17px;
      letter-spacing: 0;
      color: $color-575e6b;
      margin: 0;
    }
  }
  .p-inputnumber {
    width: 58px;
  }
}
.p-inputnumber {
  width: 100%;
  border: 1px solid var(---d5d5d6);
  border-radius: 8px;

  input {
    width: 100%;
    padding: 9px 13px;
  }
  .p-inputnumber-button-up {
    background-color: var(--primary-color);
    color: white;
  }
  .p-inputnumber-button-down {
    background-color: #c7c7ce24;
    color: var(---c7c7ce);
  }
}
.link-btn-pag {
  background-color: transparent;
  border: none;
  font-family: 'app-font-medium';
  font-style: normal;
  font-size: $font-size-13;
  line-height: 17px;
  letter-spacing: 0;
  color: $secondary;
  margin: 0;
  &.link-btn-pag:hover {
    background-color: transparent;
    border: none;
    color: $secondary;
  }
}
.prev {
  background-color: transparent;
  border: none;
  font-family: 'app-font-medium';
  font-style: normal;
  font-size: $font-size-13;
  line-height: 17px;
  letter-spacing: 0;
  color: $secondary;
  margin: 0;
  &.prev:hover {
    background-color: transparent;
    border: none;
    color: $secondary;
  }
}
</style>
