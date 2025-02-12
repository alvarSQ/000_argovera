<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
const { productBySlug } = storeToRefs(useProductsStore());

const descriptTitles = ref([
  {
    title: 'Описание',
    activ: true,
  },
  {
    title: 'Отзывы',
    activ: false,
  },
]);

const descriptActivTitle = ref('Описание');

const descriptTitleActiv = (title: string) => {
  descriptActivTitle.value = title;
  descriptTitles.value.forEach((e) => {
    if (e.title === title) {
      e.activ = true;
    } else {
      e.activ = false;
    }
  });
};

const descriptActiv = computed(() =>
  descriptActivTitle.value === 'Описание'
    ? productBySlug.value.description
    : productBySlug.value.reviews
);

const dataFromString = (dateStr: string) => {
  const formattedDate = useDateFormat(dateStr, 'DD.MM.YYYY, HH:mm');
  return formattedDate;
};
</script>

<template>
  <div class="descript">
    <ul class="descript-titles flex-line">
      <li
        :class="{ 'descript-activ': descriptTitle.activ }"
        v-for="descriptTitle in descriptTitles"
        :key="descriptTitle.title"
        @click="descriptTitleActiv(descriptTitle.title)"
      >
        {{ descriptTitle.title }}
      </li>
    </ul>
    <div class="descript-contener">
      <p
        v-if="descriptActivTitle === descriptTitles[0].title"
        v-html="descriptActiv"
      ></p>
      <div class="reviews" v-else>
        <ul class="reviews-left flex-column">
          <!-- <li
                class="flex-column"
                v-for="(review, index) in productBySlug.reviews"
                :key="index"
              >
                <div>
                  <span style="font-weight: 900">{{ review.reviewerName }}</span
                  >&nbsp;
                  <span style="font-size: small; color: #999">{{
                    dataFromString(review.date)
                  }}</span>
                </div>
                <span>{{ review.comment }}</span>
              </li> -->
        </ul>
        <div class="reviews-right flex-column">
          <UIWriteReview />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.reviews-left {
  gap: 10px;
  li {
    padding: 10px;
    border-bottom: 1px solid #999;
  }
  li:nth-child(odd) {
    background-color: #0796071e;
  }
}

.reviews {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 10px;
}

.descript {
  grid-column: span 2 / span 2;
  grid-column-start: 2;
  grid-row-start: 4;
}
.descript-titles {
  font-size: wmax(20);
  cursor: pointer;
  li {
    padding: 8px 25px;
    color: #69a869;
    background-color: #0796071e;
    border-radius: 10px 10px 0 0;
  }
}

.descript-activ {
  color: $primary-color !important;
  background-color: #fff !important;
}

.descript-contener {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 3px 10px #00000075;
  p {
    line-height: 1.4;
  }
}
</style>
