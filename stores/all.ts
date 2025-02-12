import { defineStore } from 'pinia';

export const useAllStore = defineStore('all', () => {
 
  const breadCrumbs = ref([] as string[]);

  const isLoading = ref(false)

  const searchQuery = ref('');

  const limitScroll = ref(16)

  const productsTotal = ref(0)

  const activeCategoryChain = ref([] as number[]); 


  // const setOpenCategoryId = (id: number | null) => {
  //     openCategoryId.value = id;
  //   }

  return {
    breadCrumbs,
    isLoading,
    searchQuery,
    limitScroll,
    productsTotal,
    activeCategoryChain,
    // setOpenCategoryId
  };
});