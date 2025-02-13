import { defineStore } from 'pinia';
import { useСategoriesStore } from './categories';

export const useAllStore = defineStore('all', () => {
  const breadCrumbs = ref([] as number[]);

  const isLoading = ref(false);

  const searchQuery = ref('');

  const limitScroll = ref(16);

  const productsTotal = ref(0);

  const activeCategoryChain = ref([] as number[]);

  // Получение цепочки категорий от корня до текущей
  const getCategoryChain = (categoryId: number): number[] => {
    const { categoriesTree } = storeToRefs(useСategoriesStore());
    const chain: number[] = [];
    const findChain = (categories: ICategoriesTree[]): boolean => {
      for (const category of categories) {
        chain.push(category.id);
        if (category.id === categoryId) return true; // Нашли целевую категорию
        if (category.children && findChain(category.children)) return true; // Рекурсивно ищем в детях
        chain.pop(); // Убираем категорию из цепочки, если она не ведёт к целевой
      }
      return false;
    };
    findChain(categoriesTree.value);
    
    return chain;
  };

  const activeElement = (id: number) => {    
    activeCategoryChain.value = getCategoryChain(id);    
  };

  const getBreadCrumbs = (idProduct: number) => {
    const { productBySlug } = storeToRefs(useProductsStore());
    breadCrumbs.value = [];
    breadCrumbs.value.push(...activeCategoryChain.value, idProduct);    
  };

  const updateBreadcrumbs = (newBreadcrumbs: number[]) => {
    breadCrumbs.value = newBreadcrumbs;
    activeCategoryChain.value = newBreadcrumbs.slice(0, -1);
  };

  return {
    breadCrumbs,
    isLoading,
    searchQuery,
    limitScroll,
    productsTotal,
    activeCategoryChain,
    getBreadCrumbs,
    activeElement,
    getCategoryChain,
    updateBreadcrumbs,
  };
});
