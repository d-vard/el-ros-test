import {defineStore} from "pinia";
import axios from "axios";
import {ref} from "vue";

export const useMuseumStore = defineStore('museumStore', () => {
  const museums = ref([]);
  const page = ref(1);
  const size = ref(10);
  const ordering = ref({
    id: true,
    name: true,
    is_active: true,
    activeVal: "-id"
  });
  const maxPages = ref(0);

  const getMuseums = async () => {
    try {
      const data = await axios.get(`https://developer3.elros.info/api/v1/organizations?page=${page.value}&page_size=${size.value}&ordering=${ordering.value.activeVal}`);
      museums.value = data.data.results;
      maxPages.value = Math.ceil(data.data.count / size.value);
    } catch (error) {
      console.error('Ошибка при загрузке музеев:', error);
    }
  }

  const addMuseums = async (data) => {
    try {
      const response = await axios.post(`https://developer3.elros.info/api/v1/organizations/`, data);
      await getMuseums();
    } catch (error) {
      console.error('Ошибка при создании музея:', error);
    }
  }

  const addMuseumsWithImage = async (data,image) => {
    const imageResponse = await setImage(image);

    await addMuseums({
      ...data,
      image: imageResponse.data.id,
    });
  }
  const delMuseums = async (id) => {
    try {
      await axios.delete(`https://developer3.elros.info/api/v1/organizations/${id}`);
      await getMuseums();
    } catch (error) {
      console.error('Ошибка при удалении музея:', error);
    }
  }

  const setImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      return await axios.post(
        `https://developer3.elros.info/api/v1/images/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
    } catch (error) {
      console.error('Ошибка при добавлении изображения:', error);
    }
  }

  // const delImage = async (id) => {
  //   try {
  //     await axios.delete(`https://developer3.elros.info/api/v1/organizations/1`);
  //   }
  //   catch (error) {
  //     console.error('Ошибка при удалении изображения:', error);
  //   }
  // }
  const setPage = async (val) => {
    page.value = val;
    await getMuseums();
  }

  const setOrdering = async (name) => {
    ordering.value[name] = !ordering.value[name];
    const prefix = ordering.value[name] ? '-' : '';
    ordering.value.activeVal = prefix + name;
    await getMuseums();
  }

  return {
    museums,
    page,
    size,
    ordering,
    maxPages,
    getMuseums,
    addMuseums,
    addMuseumsWithImage,
    delMuseums,
    setImage,
    // delImage,
    setPage,
    setOrdering,
  }
})
