<template>
  <v-main>
    <v-container>
      <div class="text-right mb-5">
        <router-link to="/add-museums" tag="v-btn">
          <v-btn elevation="2" append-icon="mdi-plus" color="green">Добавить</v-btn>
        </router-link>
      </div>
      <v-card :loading="museumStore.museums.length === 0" variant="outlined">
        <table class="w-100 text-left">
          <thead>
          <tr>
            <th>
              <button @click="museumStore.setOrdering('id')">
                Id
                <v-icon :icon="museumStore.ordering.id ? 'mdi-arrow-down' : 'mdi-arrow-up'" size="small"></v-icon>
              </button>
            </th>
            <th>Изображение</th>
            <th>
              <button @click="museumStore.setOrdering('name')">
                Название
                <v-icon :icon="museumStore.ordering.name ? 'mdi-arrow-down' : 'mdi-arrow-up'" size="small"></v-icon>
              </button>
            </th>
            <th>
              <button @click="museumStore.setOrdering('is_active')">
                Активен
                <v-icon :icon="museumStore.ordering.is_active ? 'mdi-arrow-down' : 'mdi-arrow-up'" size="small"></v-icon>
              </button>
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="museum in museumStore.museums">
            <td>{{ museum.id }}</td>
            <td>
              <div class="image-wrapper">
                <img :src="museum.image.image" :alt="museum.name" v-if="museum.image">
                <img :src="noImage" alt="No image" v-else>
              </div>
            </td>
            <td>{{ museum.name }}</td>
            <td>
              <v-chip color="green" v-if="museum.is_active">
                Да
              </v-chip>
              <v-chip color="red" v-else>
                Нет
              </v-chip>
            </td>
            <td>
              <v-btn icon="mdi-delete-outline" @click="museumStore.delMuseums(museum.id)"></v-btn>
            </td>
          </tr>
          </tbody>
        </table>
        <v-pagination
          v-model="page"
          :length="museumStore.maxPages"
          :total-visible="3"
        ></v-pagination>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
import {ref, watch} from "vue";
import {useMuseumStore} from "@/stores/MuseumStore";
import noImage from "@/assets/no-image-icon.png"

const museumStore = useMuseumStore();
const page = ref(museumStore.page);
museumStore.setPage(page.value);

watch(page, (newValue, oldValue) => {
  museumStore.setPage(newValue);
});

</script>

<style lang="scss">
table {
  border-collapse: collapse;
}

tr {
  th, td {
    padding: 10px;
    border-bottom: 1px solid #000;
  }
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.image-wrapper {
  max-width: 190px;
}
</style>
