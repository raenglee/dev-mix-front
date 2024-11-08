<template>
  <div class="w-4/6 mx-auto my-10">
    <section class="container mx-auto">
      <form @submit.prevent="handleSubmit" class="grid gap-y-5 px-20 py-10">
        <div class="justify-center items-center text-center space-y-3 pb-5">
          <p class="border border-[#d10000] rounded-full w-16 text-center m-auto">모집중</p>
          <h1 class="text-center font-bold text-2xl">{{ title }}</h1>
          <div class="flex space-x-2 items-center justify-center">
            <img src="/img/people.png" class="w-8 h-8" />
            <p>작{{ nickname }}</p>
          </div>
          <p class="text-gray-500 text-l text-right pr-10">조회수: {{ viewCount }}</p>
          <div class="my-3 mb-20">
            <hr class="border-t-4 border-[#d10000]" />
          </div>
        </div>

        <div class="justify-between grid grid-cols-9 gap-4 px-10">
          <div class="flex flex-col space-y-10 col-span-3">
            <div class="items-center">
              <label for="region" class="font-bold pr-2 text-lg">지역 / 구분</label>
              <p class="py-2 pl-2">{{ location }}</p>
              <!-- 지역 정보 표시 -->
            </div>
            <div class="items-center">
              <p class="font-bold pr-2 text-lg">진행 기간</p>
              <p class="py-2 pl-2">{{ projectPeriod }}</p>
            </div>
            <!-- <div class="items-center">
              <p class="font-bold pr-2 text-lg">기술 / 언어</p>
              <div class="flex items-center">
                <div class="py-2 space-x-3" v-for="tech in techStacks" :key="tech">
                  <img :src="tech.imageUrl" class="w-10 h-10" />
                  <span class="text-sm py-4">{{ tech.techStackName }}</span>
                </div>
              </div>
            </div> -->
          </div>
          <div class="col-span-2 pl-0">
            <p class="font-bold pr-2 text-lg">모집 마감일</p>
            <p class="py-2 pl-2">{{ endDate }}</p>
          </div>
          <div class="space-y-4 col-span-4 pl-20 flex flex-col">
            <p class="font-bold pr-2 text-lg">모집 현황</p>
            <!-- flex-col로 세로 방향으로 배치 -->
            <div class="flex flex-col w-full space-y-4">
              <div v-for="(position, index) in positions" :key="index" class="flex items-center justify-between">
                <p>{{ position.positionName }}</p>
                <p class="m-auto">{{ position.currentCount }}/{{ position.requiredCount }}</p>
                <button class="item-center border flex-shrink-0 border-gray-200 rounded-full min-w-14 h-7 pl-2 pr-2 m-auto hover:bg-gray-200">지원</button>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <p class="font-bold text-lg w-full items-center text-center">기술 / 언어</p>
            <div class="flex items-center w-full">
              <div class="py-2 space-x-5" v-for="tech in techStacks" :key="tech">
                <img :src="tech.imageUrl" class="w-10 h-10" />
                <span class="text-sm">{{ tech.techStackName }}</span>
              </div>
            </div>
          </div>
        </div>

        <h1 class="pt-20 pl-3 font-bold text-xl">프로젝트 소개</h1>
        <div class="mb-5">
          <hr class="border-t-4 border-[#d10000]" />
        </div>
        <p class="px-10 pb-6">{{ content }}</p>
        <div>
          <hr class="border-t-2 border-gray-200" />
        </div>
        <div class="flex justify-between mb-3 mx-7">
          <RouterLink to="/"><button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-gray-200" @click="goToList">목록</button></RouterLink>
          <div v-if="isAuthor" class="space-x-3">
            <button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-[#d10000] hover:text-white hover:border-[#d10000]">수정</button>
            <button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-[#d10000] hover:text-white hover:border-[#d10000]">삭제</button>
          </div>
        </div>

        <!-- 댓글 작성 -->
        <div class="ml-30 justify-center items-center w-full">
          <div class="flex items-center">
            <img src="/img/people.png" class="w-8 h-8 ml-7" />
            <p class="ml-3">닉네임</p>
          </div>
          <div class="flex items-center w-full">
            <div class="item my-6 mx-7 justify-center" style="width: 90%">
              <textarea v-model="content" class="w-full p-3 h-20 border border-gray-200 rounded-md focus:outline-none ring-gray-200 resize-none bg-gray-100"></textarea>
            </div>
            <div style="width: 10%">
              <button @click.prevent="addComment" class="border border-gray-200 rounded-md h-20 w-20 px-2 text-base hover:bg-gray-200">등록</button>
            </div>
          </div>
        </div>

        <!-- 댓글 목록 -->
        <!-- <div class="mt-5">
          <ul>
    <li v-for="comment in commentStore.comments" :key="comment.id" class="border-b py-3 flex items-start">
      <img :src="comment.profileImage" alt="Profile" class="w-8 h-8 mr-2 rounded-full" />
      <div class="flex-1">
        <div class="flex justify-between">
          <p class="font-bold">{{ comment.nickname }}</p>
          <p class="text-gray-500 text-sm">{{ comment.createdAt }}</p>
        </div>
        <p class="py-3">{{ comment.content }}</p>
      </div>
    </li>
  </ul>
        </div> -->
      </form>
    </section>
  </div>
</template>

<script setup>
import { getProjectView } from '@/api/projectApi';
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const title = ref('');
const location = ref('');
const endDate = ref('');
const content = ref('');
const projectPeriod = ref('');
const viewCount = ref('');
const nickname = ref('');
const techStacks = ref([]);
const positions = ref([]);

watchEffect(async () => {
  const res = await getProjectView(route.params.board_id);
  console.log(res.data.result);
  if (res.status == 200) {
    title.value = res.data.result.title;
    content.value = res.data.result.content;
    location.value = res.data.result.location;
    endDate.value = res.data.result.endDate;
    projectPeriod.value = res.data.result.projectPeriod;
    viewCount.value = res.data.result.viewCount;
    nickname.value = res.data.result.nickname;
    techStacks.value = res.data.result.techStackDtoList;
    positions.value = res.data.result.positionDtoList;
    // console.log('기술스택확인', res.data.result.techStackDtoList);
    // console.log('포지션 배열 확인', res.data.result.positionDtoList);
  } else {
    alert('데이터연결안됨', res.response.data.message);
  }
});


// const isAuthor = computed( () = > )

</script>

<style lang="scss" scoped></style>
