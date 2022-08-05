<template>
  <div class="date-item" :class="delet ? 'date-item__active' : ''">
    <div class="row mb-4">
      <div class="col">
        <div class="form-outline">
          <h3 class="sub-title">Дата начала</h3>
          <input
            v-model="date.dataStart"
            type="date"
            id="form6Example1"
            class="form-control"
          />
        </div>
      </div>
      <div class="col">
        <div class="form-outline">
          <h3 class="sub-title">Время начала</h3>
          <input
            v-model="date.timeStart"
            type="time"
            id="form6Example1"
            class="form-control"
          />
        </div>
      </div>
      <div class="col">
        <div class="form-outline">
          <h3 class="sub-title">Дата окончания</h3>
          <input
            v-model="date.dataEnd"
            type="date"
            id="form6Example1"
            class="form-control"
          />
        </div>
      </div>
      <div class="col">
        <div class="form-outline">
          <h3 class="sub-title">Время окончания</h3>
          <input
            v-model="date.timeEnd"
            type="time"
            id="form6Example1"
            class="form-control"
          />
        </div>
      </div>
    </div>
    <button @click="(event) => deletData(event, date.id)" class="delete-item">
      <span
        ><svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.16663 1.16666L12.6571 12.6571M12.9857 1.16666L1.4952 12.6571"
            stroke="white"
            stroke-width="2"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["date", "delet", "deletData"],
};
</script>

<style scoped>
.date-item {
  position: relative;
  background: transparent;
  padding: 15px;
  margin-bottom: 15px;
}
.date-item.date-item__active {
  background: #faf7fe;
}
.date-item.date-item__active .delete-item {
  display: block;
}
.delete-item {
  border: none;
  width: 30px;
  height: 30px;
  background: #351767;
  border-radius: 50%;
  position: absolute;
  z-index: 11;
  top: -5%;
  right: -1%;
  display: none;
}
</style>