<template>
  <button>{{ text }}</button>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style scoped>
button {
  box-sizing: border-box;
  padding: 17px 23px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #9b63f8;
  border-radius: 4px;
}
button.white {
  width: 285px;
  height: 58px;
}
button.color {
  width: 285px;
  height: 58px;
  background-color: #9b63f8;
  color: white;
}
</style>