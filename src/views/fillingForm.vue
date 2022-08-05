<template>
  <div class="container">
    <h4>Шаг 1</h4>
    <div class="wrapper">
      <form>
        <h2 class="title">Информация об организаторе</h2>
        <div class="form-outline mb-4">
          <h3 class="sub-title">Организатор</h3>
          <input
            v-model="inputForm.companyName"
            type="text"
            id="form6Example3"
            class="form-control"
            placeholder="Coca-Cola"
          />
        </div>
        <h2 class="title">Контактные данные</h2>
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <h3 class="sub-title">Телефон</h3>
              <input
                v-model="inputForm.telephone"
                type="tel"
                id="form6Example1"
                class="form-control"
                v-mask="['+#(###) ###-##-##', '+#(###) ###-##-##']"
                placeholder="+7 (999) 555-33-22"
              />
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <h3 class="sub-title">E-mail</h3>
              <input
                v-model="inputForm.email"
                type="email"
                id="form6Example2"
                class="form-control"
                placeholder="ivanov@mail.ru"
              />
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <h3 class="sub-title">Город организатора</h3>
              <input
                v-model="inputForm.city"
                type="text"
                id="form6Example1"
                class="form-control"
                placeholder="Казань"
              />
            </div>
          </div>
        </div>
        <h2 class="title">Общая информация</h2>
        <div class="form-outline mb-4">
          <h3 class="sub-title">Название</h3>
          <input
            v-model="inputForm.title"
            type="text"
            id="form6Example4"
            class="form-control"
          />
        </div>
        <h2 class="title">Фотография</h2>
        <div class="upload-file">
          <div>
            <label class="upload-file__foto-upload"
              ><input @change="handleChange" type="file"
            /></label>
          </div>
          <div class="upload-file__preview">
            <img
              v-if="productImage"
              class="upload-file__preview-img"
              :src="productImage"
              alt="preview"
            />
            <button
              @click="deleteImage"
              class="upload-file__preview__delete-img"
            >
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
        </div>
        <div class="form-outline mb-4">
          <h3 class="sub-title">Подробное описание</h3>
          <textarea
            v-model="inputForm.description"
            class="form-control ddd"
            id="form6Example7"
            rows="4"
          ></textarea>
        </div>
        <div>
          <div v-for="(date, i) in dates" :key="date">
            <DataEvent
              :deletData="deletData"
              :date="date"
              :delet="dates.length - 1 !== i"
            />
          </div>
          <Button @click="addDate" text="+ Добавить дату" />
        </div>
        <h2 class="title">Контактные данные</h2>
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <h3 class="sub-title">Рейтинг мероприятия</h3>
              <select v-model="inputForm.age" class="select">
                <option v-for="age in age.result" :key="age" :value="age.title">
                  {{ age.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <h3 class="sub-title">Адрес мероприятия</h3>
              <input
                v-model="inputForm.address"
                type="text"
                id="form6Example1"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="btn-next">
          <Button class="white" text="Отменить" />
          <Button class="color" text="Далее" @click="nextPages" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Buttons/Button.vue";
import axios from "axios";
import { computed, ref } from "@vue/reactivity";
import DataEvent from "@/components/DataEvent/DataEvent.vue";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "vuex";
import router from "@/router";

export default {
  components: { Button, DataEvent },
  data() {
    return {
      age: [],
    };
  },
  methods: {
    async fetchAge() {
      try {
        const response = await axios.get("http://localhost:8080/api");
        this.age = response.data;
      } catch (e) {
        console.log("Ошибка вывода массива данных!");
      }
    },
  },
  mounted() {
    this.fetchAge();
  },
  setup() {
    const productImage = ref("");
    const store = useStore();
    const posts = computed(() => store.state.posts);

    const nextPages = () => {
      store.commit("setPosts", inputForm);
      router.push("/send");
    };

    const addDate = (event) => {
      event.preventDefault();
      if (dates.value[dates.value.length - 1].dataStart === "") {
        return;
      }
      if (dates.value[dates.value.length - 1].timeStart === "") {
        return;
      }
      if (dates.value[dates.value.length - 1].dataEnd === "") {
        return;
      }
      if (dates.value[dates.value.length - 1].timeEnd === "") {
        return;
      }

      dates.value.push({
        dataStart: "",
        timeStart: "",
        dataEnd: "",
        timeEnd: "",
        id: uuidv4(),
      });
    };

    const deletData = (event, id) => {
      event.preventDefault();
      dates.value = dates.value.filter((item) => {
        return item.id !== id;
      });
    };

    const dates = ref([
      {
        dataStart: "",
        timeStart: "",
        dataEnd: "",
        timeEnd: "",
        id: uuidv4(),
      },
    ]);

    const inputForm = ref({
      title: "",
      age: "",
      companyName: "",
      telephone: "",
      email: "",
      city: "",
      address: "",
      description: "",
      photo: productImage,
      dates: dates.value,
    });
    const handleChange = (e) => {
      console.log(productImage);
      const files = e.target.files;
      createImage(files[0]);
    };
    const createImage = (file) => {
      let image = new Image();
      let reader = new FileReader();
      reader.onload = (e) => {
        productImage.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    const deleteImage = (event) => {
      event.preventDefault();
      productImage.value = "";
    };
    return {
      handleChange,
      productImage,
      deleteImage,
      deletData,
      addDate,
      dates,
      inputForm,

      nextPages,
    };
  },
};
</script>

<style>
.title {
  font-size: 18px;
  line-height: 22px;
  margin: 30px 0;
}
.sub-title {
  font-size: 16px;
  line-height: 20px;
}
.form-control {
  border: 1px solid #cdb1fb;
  border-radius: 4px;
  height: 58px;
}
.form-outline textarea {
  height: 193px;
}
.form-control:focus {
  box-shadow: 1px 0px 1px 0px #cdb1fb;
}
.upload-file__foto-upload input {
  display: none;
}
.upload-file__foto-upload {
  min-width: 126px;
  min-height: 126px;
  margin-right: 20px;
  background-image: url(../assets/foto.png);
  background-repeat: no-repeat;
  background-repeat: round;
  cursor: pointer;
}
h3 {
  white-space: nowrap;
}

.upload-file__preview-img {
  max-width: 126px;
  max-height: 126px;
  border-radius: 4px;
}

.upload-file {
  display: flex;
}

.upload-file__preview {
  position: relative;
}

.upload-file__preview__delete-img {
  border: none;
  width: 30px;
  height: 30px;
  background: #351767;
  border-radius: 50%;
  position: absolute;
  top: -10%;
  right: -10%;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}
input[type="date"] {
  background: url(../assets/data.png) 95% 50% no-repeat;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}
input[type="time"] {
  background: url(../assets/time.png) 95% 50% no-repeat;
}
.select {
  border: 1px solid #cdb1fb;
  border-radius: 4px;
  height: 58px;
  display: block;
  width: 100%;
  padding: 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url(../assets/Vector.png) 95% 50% no-repeat;
}
</style>