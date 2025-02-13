import { defineStore } from 'pinia';
import { useСategoriesStore } from './categories';

export const useAllStore = defineStore('all', () => {
  interface IBreadCrumbs {
    id: number[];
    name: string;
  }
  const breadCrumbs = ref({
    id: [],
    name: '',
  } as IBreadCrumbs);

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

  // получаем массив вложенных категорий + имя товара из slug, эта функция также позволяет не слетать крошкам после перезагрузки страницы
  const getBreadCrumbs = (
    idCategory: number,
    nameProduct: string,
    idCategoryByProduct: number
  ) => {
    breadCrumbs.value = {
      id: [],
      name: '',
    } as IBreadCrumbs;
    idCategory
      ? (activeCategoryChain.value = getCategoryChain(idCategory))
      : null;
    idCategoryByProduct
      ? (activeCategoryChain.value = getCategoryChain(idCategoryByProduct))
      : null;
    breadCrumbs.value.id.push(...activeCategoryChain.value);
    breadCrumbs.value.name = nameProduct;
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
  };
});
