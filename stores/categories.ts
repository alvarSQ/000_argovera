import { defineStore } from 'pinia';

export const useСategoriesStore = defineStore('categories', () => {
  const config = useRuntimeConfig();
  const URL = `${config.public.URL_BACK}/categories/`;

  const categories = ref([] as ICategories[]);

  const categoriesTree = ref([] as ICategoriesTree[]);

  const productsByCategory = ref({} as IProductsByCategory);

  const loadCategories = async (tree: string, slug: string) => {
    const { isLoading } = storeToRefs(useAllStore());
    isLoading.value = true;
    let url = `${URL}`;
    tree ? (url = `${URL}${tree}`) : url;
    slug ? (url = `${URL}${slug}`) : url;
    try {
      const data = await $fetch(url);
      if (tree) categoriesTree.value = data as ICategoriesTree[];
      if (slug) productsByCategory.value = data as IProductsByCategory;      
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      isLoading.value = false;
    }
  };

  return { categories, categoriesTree, productsByCategory, loadCategories };
});
