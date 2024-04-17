<template>
  <v-main>
    <v-container>
      <v-card variant="outlined" class="pa-5">
        <form @submit.prevent="addNewMuseum">
          <v-text-field label="Полное название" v-model="formData.name"></v-text-field>
          <v-alert v-if="rules.name" type="error" class="mb-4">Поле не может быть пустым</v-alert>
          <v-text-field label="Короткое название" v-model="formData.short_name"></v-text-field>
          <v-alert v-if="rules.short_name" type="error" class="mb-4">Поле не может быть пустым</v-alert>
          <v-textarea label="Описание" v-model="formData.description"></v-textarea>
          <v-alert v-if="rules.description" type="error" class="mb-4">Поле не может быть пустым</v-alert>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp, image/webp, image/jpg"
            label="Изображение"
            placeholder="Выбрать файл"
            prepend-icon="mdi-image"
            v-model="formImage"
          ></v-file-input>
          <v-checkbox label="Активен" v-model="formData.is_active"></v-checkbox>
          <v-row justify="end">
            <button class="mr-5">
              <v-btn color="green">Создать</v-btn>
            </button>
            <router-link to="/" tag="v-btn">
              <v-btn color="blue">Назад</v-btn>
            </router-link>
          </v-row>
        </form>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
import {ref} from "vue";
import {useMuseumStore} from "@/stores/MuseumStore";
import {useRouter} from "vue-router";

const museumStore = useMuseumStore();

const formData = ref({
  name: '',
  short_name: '',
  is_active: false,
  description: '',
});

const formImage = ref({});

const rules = ref({
  name: false,
  short_name: false,
  description: false,
})

const router = useRouter();

const addNewMuseum = () => {
  let valid = true;
  for (let formDataKey in formData.value) {
    if (formDataKey === "is_active") continue;
    if (formData.value[formDataKey].length < 1) {
      valid = false;
      rules.value[formDataKey] = true;
    } else {
      rules.value[formDataKey] = false;
    }
  }
  if (!valid) return false;

  if (formImage.value.name) {
    museumStore.addMuseumsWithImage(formData.value, formImage.value);
  } else {
    museumStore.addMuseums(formData.value);
  }
  router.push('/');
}
</script>
