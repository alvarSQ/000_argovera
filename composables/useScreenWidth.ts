export function useScreenWidth() {
  const screenWidth = ref(0); // Начальное значение 0

  const updateWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    if (import.meta.client) {
      // Проверяем, что код выполняется на клиенте
      updateWidth(); // Инициализируем значение ширины экрана
      window.addEventListener('resize', updateWidth);
    }
  });

  onBeforeUnmount(() => {
    if (import.meta.client) {
      // Проверяем, что код выполняется на клиенте
      window.removeEventListener('resize', updateWidth);
    }
  });

  return screenWidth;
}
