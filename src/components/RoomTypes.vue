<template>
  <q-card class="room-type-card">
    <q-card-section>
      <div class="text-h6">Parte B — Consultas a la base de datos</div>
      <div class="text-subtitle2 text-grey">Histórico de tarifas de habitaciones.</div>
    </q-card-section>

    <q-card-section>
      <div class="text-subtitle1 text-weight-medium q-mb-sm">Resumen</div>
      <q-banner v-if="summaryError" class="bg-negative text-white q-mb-md">
        {{ summaryError }}
      </q-banner>
      <q-table
        :rows="summary"
        :columns="summaryColumns"
        row-key="id"
        :loading="summaryLoading"
        flat
        dense
        hide-bottom
        :pagination="{ rowsPerPage: 0 }"
      >
        <template #body-cell-average_price="props">
          <q-td :props="props">
            {{ formatPrice(props.row.average_price) }}
          </q-td>
        </template>
      </q-table>
    </q-card-section>

    <q-card-section>
      <div class="text-subtitle1 text-weight-medium q-mb-sm">Tarifa más reciente</div>
      <q-banner v-if="ratesError" class="bg-negative text-white q-mb-md">
        {{ ratesError }}
      </q-banner>
      <q-table
        :rows="latestRates"
        :columns="ratesColumns"
        row-key="id"
        :loading="ratesLoading"
        flat
        dense
        hide-bottom
        :pagination="{ rowsPerPage: 0 }"
      >
        <template #body-cell-price="props">
          <q-td :props="props">
            {{ formatPrice(props.row.price) }}
          </q-td>
        </template>
        <template #body-cell-valid_from="props">
          <q-td :props="props">
            {{ formatDate(props.row.valid_from) }}
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchRoomTypesSummary, fetchRoomTypesLatestRates } from '../utils/roomtypes'

const summary = ref([])
const summaryLoading = ref(true)
const summaryError = ref(null)

const latestRates = ref([])
const ratesLoading = ref(true)
const ratesError = ref(null)

const summaryColumns = [
  {
    name: 'name',
    required: true,
    label: 'Tipo de habitación',
    field: 'name',
    align: 'left',
  },
  {
    name: 'rates_count',
    label: 'N.º de tarifas',
    field: 'rates_count',
    align: 'center',
  },
  {
    name: 'average_price',
    label: 'Precio medio',
    field: 'average_price',
    align: 'right',
  },
]

const ratesColumns = [
  {
    name: 'name',
    required: true,
    label: 'Tipo de habitación',
    field: 'name',
    align: 'left',
  },
  {
    name: 'price',
    label: 'Precio',
    field: 'price',
    align: 'right',
  },
  {
    name: 'valid_from',
    label: 'Válido desde',
    field: 'valid_from',
    align: 'left',
  },
]

function formatPrice(value) {
  if (value == null) return '—'
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-ES')
}

onMounted(async () => {
  try {
    summary.value = await fetchRoomTypesSummary()
  } catch (e) {
    summaryError.value = e.message
  } finally {
    summaryLoading.value = false
  }

  try {
    latestRates.value = await fetchRoomTypesLatestRates()
  } catch (e) {
    ratesError.value = e.message
  } finally {
    ratesLoading.value = false
  }
})
</script>

<style scoped>
.room-type-card {
  flex: 0 0 50%;
  min-width: 0;
}
</style>
