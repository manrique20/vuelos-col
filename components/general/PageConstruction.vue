<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
  <div id="content-construction">
    <img src="/img/ic_construction.svg" />
    <h2>Esta pagina se encuentra en proceso</h2>
    <p>
      Lo sentimos, estamos trabajando para mejorar. Si no encuentras lo que
      deseas te invitamos a volver al inicio.
    </p>
    <NuxtLink id="button-back" :to="localePath('/')">Inicio</NuxtLink>
  </div>
</template>
<style lang="scss" scoped>
#content-construction {
  padding: 60px 10px;
  width: 90%;
  max-width: 900px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 100%;
    max-width: 500px;
    max-height: 300px;
  }
  h2 {
    margin-top: 40px;
    color: #3c3c3c;
    font-size: 1.6em;
  }
  p {
    color: #212121;
    font-size: 1em;
    width: 100%;
    max-width: 600px;
    text-align: center;
  }
  #button-back {
    background-color: #fff761;
    border-radius: 5px;
    height: 46px;
    width: 195px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #3c3c3c;
    font-size: 0.85em;
    font-weight: bold;
    margin-top: 33px;
  }
}
</style>
