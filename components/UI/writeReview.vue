<script setup lang="ts"></script>

<template>
  <form class="review_form">
    <div class="rew-title">Написать отзыв</div>
    <textarea class="review_textarea" name="text"></textarea>
    <div class="flex-column">
      <div class="flex-line">
        <label for="review_name">Имя</label>
        <input class="input_name" type="text" value="" />
      </div>
      <div class="flex-line">
        <label for="review_email">E-Mail</label>
        <input class="input_name" type="email" value="" />
      </div>
    </div>
    <!-- <noindex>
        <div class="confcheck">
          <div class="policywrapper">
            <div class="labeltxt">
              Настоящим подтверждаю, что я ознакомлен и согласен с
              <span class="personaldata">условиями</span>
              политики конфиденциальности.
            </div>
          </div>
        </div>
      </noindex> -->
    <button class="btn">Отправить</button>
    <!-- <div class="check_block">
        <input class="check_inp" type="checkbox"/>
        <div class="check_bt"><div class="not_bt">Я нe рoбoт</div></div>
      </div> -->
  </form>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

label {
  font-size: wmax(16);
}

.btn {
  margin-top: 10px;
}

.input_name {
  font-size: small;
  width: 80%;
  height: 25px;
  border-radius: 5px;
  border: 1px solid $primary-color;
}

.review_textarea {
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 1px solid $primary-color;
  margin-bottom: 10px;
}

.rew-title {
  font-size: wmax(24);
  margin-bottom: 10px;
  color: $primary-color;
}

.flex-line {
  width: 70%;
  justify-content: space-between;
}
</style>
