<script setup lang="ts">
import { Status } from '~/interfaces/Enums.interface'
const emit = defineEmits(['changeStatus'])
const flightStore = useFlightStore()
const { t } = useI18n()
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})
/* List */
const statusList = Object.entries(Status).map(([key, value]) => ({
  key: t(`table.enums.status.${key}`) || key,
  value,
}))

const statusSelected = ref(props.status)

const changeStatus = () => {
  flightStore.changeFlightStatus(Number(props.id), statusSelected.value as 'active' | 'inactive')
  emit('changeStatus', statusSelected.value)
}

onMounted(() => {
  nextTick(async () => {})
})
</script>
<template>
  <div class="detail-status-page">
    <span class="general-dropdown detail-status table" :class="statusSelected">
      <Select
        v-model="statusSelected"
        :placeholder="t('filter.filters.status')"
        option-value="value"
        option-label="key"
        :class="status"
        @change="changeStatus"
        :options="[...statusList]"
      >
        <template #dropdownicon>
          <i
            class="pi pi-chevron-down icon-dropdown"
            :class="statusSelected"
          ></i>
        </template>
        <template #option="slotProps">
          <span
            :class="[
              status === slotProps.option.value
                ? 'not-option hidden'
                : 'selected-option',
            ]"
          >
            {{ slotProps.option.key }}
          </span>
        </template>
      </Select>
    </span>
  </div>
</template>
