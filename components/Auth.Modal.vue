<script lang="ts" setup>
const productsStore = useProductsStore();
const authStore = useAuthStore();
const cartStore = useCartStore();

const userInput: IUserLogin = reactive({
  user: {
    username: '',
    email: '',
    password: '',
  },
});

const userInputAuth = async () => {
  let type = 'register';
  if (isRegister.value) {
    type = 'login';
    delete userInput.user.username;
  }
  await authStore.authUser(type, userInput);
  await productsStore.favoritedProducts(0);
  await cartStore.getCartToUser()
  emit('closeModal')
};

const isRegister = ref(true);

const emit = defineEmits(['closeModal']);
</script>

<template>
  <div class="modal">
    <div class="title" v-if="isRegister">Авторизация</div>
    <div class="title" v-else>Регистрация</div>
    <form class="text-field" @submit.prevent="userInputAuth">
      <div v-if="!isRegister">
        <label class="text-field__label" for="login">Логин</label>

        <input class="text-field__input" type="text" name="login" id="login" placeholder="Введите ваш логин"
          v-model="userInput.user.username" />
      </div>

      <div>
        <label class="text-field__label" for="login">E-mail</label>

        <input class="text-field__input" type="text" name="login" id="email" placeholder="foo2@gmail.com"
          v-model="userInput.user.email" />
      </div>

      <div>
        <label class="text-field__label" for="password">Пароль</label>

        <input class="text-field__input" type="password" name="password" id="password" placeholder="123"
          v-model="userInput.user.password" autocomplete="on" />
      </div>
      <div class="flex-line">
        <button class="btn">Отправить</button>
        <span>или</span>
        <span class="register" @click="isRegister = false" v-if="isRegister">Зарегистрироваться</span>
        <span class="register" @click="isRegister = true" v-else>Авторизироваться</span>
      </div>
    </form>
  </div>
  <div class="dark" @click="$emit('closeModal')"></div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.register {
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: $primary-color;
  }
}

.btn {
  width: 35%;
}

.flex-line {
  justify-content: space-between;
}


.title {
  font-size: 20px;
  font-weight: 600;
  line-height: 24.2px;
  color: $primary-color;
}

.cross {
  width: 30px;
  height: 30px;
  color: #b3b3b3;
  cursor: pointer;

  &:hover {
    color: #202020;
  }
}

.modal {
  font-family: $mainFont;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 390px;
  min-width: 340px;
  padding: 20px;
  gap: 20px;
  border-radius: 15px;
  background-color: white;
  z-index: 99;

  @media (max-width: 412px) {
    width: 100%;
  }
}

.dark {
  background: #000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: 98;
}
</style>
