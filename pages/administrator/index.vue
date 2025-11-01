<template>
  <div class="admin-page">
    <h2 class="title">
      <u>Vuelos</u> Crear Vuelos
    </h2>

    <!-- Filtros -->
    <div class="filters">
      <input type="text" placeholder="Buscar" />
      <input type="date" placeholder="Fecha Origen" />
      <input type="date" placeholder="Fecha Salida" />
      <input type="time" placeholder="Hora" />
      <input type="text" placeholder="Lugar" />
      <select>
        <option>Tipo de Vuelo</option>
        <option>Nacional</option>
        <option>Internacional</option>
      </select>
      <select>
        <option>Categoría</option>
        <option>Económica</option>
        <option>Ejecutiva</option>
      </select>
      <button class="btn-crear">Crear Vuelo</button>
    </div>

    <!-- Tabla -->
    <table class="tabla-vuelos">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fechas</th>
          <th>Hora</th>
          <th>Lugar</th>
          <th>Tipo de Vuelo</th>
          <th>Categoría</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 5" :key="n">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><button class="btn-delete">🗑️</button></td>
        </tr>
      </tbody>
    </table>

    <!-- Botones -->
    <div class="acciones">
      <button class="btn-cancelar">CANCELAR</button>
      <button class="btn-guardar">GUARDAR</button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.admin-page {
  background-color: #c5e6f6;
  padding: 20px;
  min-height: 100vh;
}

.title {
  font-size: 22px;
  margin-bottom: 10px;
  color: #000;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background: #bff0c0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.filters input,
.filters select {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.btn-crear {
  background-color: #6fc8ff;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.tabla-vuelos {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.tabla-vuelos th {
  background-color: #0f8de4;
  color: white;
  padding: 10px;
}

.tabla-vuelos td {
  background-color: #e9e9e9;
  border: 1px solid #ccc;
  text-align: center;
  padding: 8px;
}

.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
}

.acciones {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.btn-cancelar,
.btn-guardar {
  background-color: black;
  color: white;
  padding: 8px 20px;
  border-radius: 10px;
  border: 2px solid #8b0000;
  font-weight: bold;
  cursor: pointer;
}
</style>
