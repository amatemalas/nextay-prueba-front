<template>
  <q-card class="fibonacci-card">
    <q-card-section>
      <div class="text-h6">Parte A — Sucesión de Fibonacci</div>
      <div class="text-subtitle2 text-grey">
        Introduce un número n para mostrar los primeros términos de la sucesión.
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        v-model="inputValue"
        type="number"
        label="Valor de n"
        hint="0 o positivo"
        outlined
        dense
        :error="hasError"
        :error-message="errorMsg"
        class="fibonacci-input"
        @update:model-value="onInput"
      />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div v-if="sequence.length === 0" class="text-grey text-center q-py-md">
        Introduce un número para generar la sucesión.
      </div>

      <q-list v-else bordered separator dense>
        <q-item v-for="(value, idx) in sequence" :key="idx">
          <q-item-section avatar>
            <q-badge color="primary" :label="`F(${idx})`" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="fibonacci-value">{{ value }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { fibonacciSequence } from '../utils/fibonacci'

const inputValue = ref(null)
const rawInput = ref('')

const MAX_N = 1000

function onInput(val) {
  rawInput.value = String(val ?? '')
}

const hasError = computed(() => errorMsg.value !== '')
const errorMsg = computed(() => {
  const raw = rawInput.value.trim()

  if (raw === '') return ''

  const num = Number(raw)

  if (!Number.isFinite(num) || !Number.isInteger(num)) {
    return 'Introduce un número entero válido.'
  }
  if (num < 0) {
    return 'El valor debe ser 0 o positivo.'
  }
  if (num > MAX_N) {
    return `Máximo permitido: ${MAX_N}.`
  }

  return ''
})

const sequence = computed(() => {
  const raw = rawInput.value.trim()
  if (raw === '') return []

  const num = Number(raw)
  if (!Number.isFinite(num) || !Number.isInteger(num) || num < 0 || num > MAX_N) {
    return []
  }

  return fibonacciSequence(num)
})
</script>

<style scoped>
.fibonacci-card {
  flex: 0 0 50%;
  min-width: 0;
}

.fibonacci-input {
  max-width: 200px;
}

.fibonacci-value {
  font-family: monospace;
  font-size: 0.95rem;
  word-break: break-all;
}
</style>
