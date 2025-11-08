<script setup lang="ts">
import type { TableHeaders } from "~/interfaces/Table.interface";

/** emits */
const emit = defineEmits([
  "change-page",
  "edit-item",
  "changeStatus",
  "change-sortable",
  "reload",
  "accept-reject",
]);

/** props */
const props = defineProps({
  headers: {
    type: Array as PropType<TableHeaders[]>,
    required: true,
  },
  fields: {
    type: Array as PropType<unknown[]>,
    required: true,
  },
  empty: {
    type: String,
    required: false,
    default: "",
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  presort: {
    type: String,
    required: false,
  },
  limit: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  offset: {
    type: Number,
    required: false,
    default: 0,
  },
});

/** variables */
const route = useRoute();
const { t } = useI18n();

const multiSortMeta = ref<DataTableSortMeta[]>(
  props.presort ? [{ field: props.presort, order: -1 }] : []
);

// methods
const searchField = (path: string, data: any) => {
  return useSearchItemJson(path, data);
};

const getEnum = (_value: any, _action: string) => {
  let text = "";

  switch (_action) {
    case "role":
      text = t(`table.enums.role.${_value}`);
      break;
    default:
      break;
  }

  return text;
};

const onPage = (event: any) => {
  emit("change-page", event);
};

const getGoTo = (_prop: any, _item: any) => {
  let url = "";

  switch (_item.action) {
    case "detail":
      url = route.path + "/" + _prop.data.id;
      break;
    case "clicks":
      url = route.path + "/" + _prop.data.id + "/clicks-count";
      break;
    default:
      break;
  }

  return url;
};

// Manejador del evento de sort
const onSort = (event: any) => {
  // Actualizar el estado local
  multiSortMeta.value = event.multiSortMeta;

  // Transformar y emitir los datos para el backend
  const sortArray = event.multiSortMeta.map((sortItem: any) => ({
    key: sortItem.field,
    order: sortItem.order === 1 ? "ASC" : "DESC",
  }));

  emit("change-sortable", sortArray);
};

const pageFirst = computed({
  get: () => props.offset,
  set: (newValue) => {},
});

watch(
  () => props.presort,
  (newPresort) => {
    if (newPresort) {
      multiSortMeta.value = [{ field: newPresort, order: -1 }];
    }
  }
);
</script>

<template>
  <div class="app-container-table">
    <div class="table-project">
      <DataTable
        :value="fields"
        responsive-layout="scroll"
        :loading="loading"
        sortMode="multiple"
        v-model:multiSortMeta="multiSortMeta"
        @sort="onSort"
        removableSort
      >
        <Column
          v-for="(item, index) of headers"
          :key="index"
          :field="item.sortable ? item.field : undefined"
          :header="item.header"
          :sortable="item.sortable"
          :header-style="item.headerStyle"
          :header-class="item.headerClass"
        >
          <template #body="slotProps">
            <nuxt-link
              v-if="item.type === 'principal'"
              :class="'principal-title ' + item.fieldClass"
              :to="getGoTo(slotProps, item)"
            >
              {{ searchField(item.field, slotProps.data) }}
            </nuxt-link>

            <Button
              v-else-if="item.type === 'edit-button'"
              class="py-0 app-general-button app-btn-transparent"
              @click="emit('edit-item', slotProps.data)"
            >
              <template #icon>
                <img src="/icons/ic_edit_table.svg" alt="edit item" />
              </template>
            </Button>

            <div
              v-else-if="item.type === 'state'"
              class="flex items-center justify-content-center"
              :class="item.fieldClass"
            >
              <GeneralTableStatus
                v-if="searchField(item.field, slotProps.data) !== 'full'"
                :id="slotProps.data.id"
                :status="searchField(item.field, slotProps.data)"
                :service="item.service"
                @reload="$emit('reload')"
              />
              <p v-else :class="'table-status ' + searchField(item.field, slotProps.data)">
                {{
                  t(t(`table.enums.status.${searchField(item.field, slotProps.data)}`), item.enum)
                }}
              </p>
            </div>

            <p v-else-if="item.type === 'enum'">
              {{ getEnum(searchField(item.field, slotProps.data), item.enum) }}
            </p>
            <p v-else-if="item.type === 'price'">
              {{ useFormatPrice(searchField(item.field, slotProps.data)) }}
            </p>
            <p v-else-if="item.type === 'date'">
              {{
                useFormatDate(
                  searchField(item.field, slotProps.data),
                  "date-table"
                )
              }}
            </p>

            <div
              v-else-if="item.type === 'rating'"
              class="flex justify-content-center"
            >
              <span class="general-rating">
                <Rating
                  v-if="searchField(item.field, slotProps.data)"
                  :defaultValue="searchField(item.field, slotProps.data)"
                  disabled
                />
                <p v-else>N/A</p>
              </span>
            </div>

            <p v-else class="m-0" :class="item.fieldClass">
              {{ searchField(item.field, slotProps.data) }}
            </p>

            <p v-if="item.subField" class="m-0" :class="item.subFieldClass">
              {{ searchField(item.subField, slotProps.data) }}
            </p>
          </template>
        </Column>

        <template #loading>
          <p id="loading-text">{{ $t("table.loading") }}</p>
        </template>

        <template #empty>
          <GeneralEmptyTable :message="empty" />
        </template>
      </DataTable>
    </div>
  </div>
</template>
