<script setup lang="ts">
const { user } = storeToRefs(useAuthStore());
const { isLoading } = storeToRefs(useAllStore());
const authStore = useAuthStore();

definePageMeta({
    middleware: 'auth',
});

const userInput: IUserLogin = reactive({
    user: {
        username: user.value?.username ?? '',
        email: user.value?.email ?? ''
    },
});

// Computed-свойства для контроля ввода
const userNameInput = computed({
    get: () => userInput.user.username,
    set: (string) => {
        // Разрешаем буквы (латинские и кириллические), цифры и символы (-, _)
        userInput.user.username = string?.replace(/[^a-zA-Zа-яА-ЯёЁ0-9_-]/g, '');
    },
});

const emailInput = computed({
    get: () => userInput.user.email,
    set: (string) => {
        // Разрешаем символы, допустимые для email
        userInput.user.email = string.replace(/[^a-zA-Z0-9@._-]/g, '');
    },
});

const updateUserData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userInput.user.username !== user.value.username
        || userInput.user.email !== user.value.email) {

        if (!userInput.user.username || !emailRegex.test(userInput.user.email)) {
            console.error('Некорректные данные');
            return;
        }

        authStore.updateUser(userInput)
    }
}

</script>

<template>
    <span class="title">Личный кабинет</span>
    <ClientOnly>
        <UIPreloader v-if="isLoading" />
        <div class="user-content flex-column" v-else>
            <div>
                <label class="text-field__label" for="login">Логин</label>

                <div class="flex-line">
                    <input class="text-field__input" type="text" name="login" id="login" placeholder="Введите ваш логин"
                        v-model="userNameInput" />
                    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click="updateUserData()">
                        <path d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14"
                            stroke="#909399" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

            <div>
                <label class="text-field__label" for="login">E-mail</label>

                <div class="flex-line">
                    <input class="text-field__input" type="text" name="login" id="email" placeholder="foo2@gmail.com"
                        v-model="emailInput" />
                    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click="updateUserData()">
                        <path d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14"
                            stroke="#909399" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div class="btn" @click="authStore.logUserOut()">
                Выход
            </div>
        </div>
    </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/scss/utils/vars.scss' as *;

.btn {
    // margin-top: 20px;
    width: 150px;
}

.user-content {
    margin-top: 10px;
    max-width: 450px;
    min-width: 200px;
    gap: 15px;

    svg {
        position: relative;
        right: 40px;
        cursor: pointer;

        &:hover path {
            stroke: #303133;
        }
    }
}

.text-field__input {
    padding-right: 45px;
}
</style>