<template>
  <div class="my-3">
    <hr class="border-t-4 border-[#d10000]" />
  </div>
  <div class="pt-7 px-2">
    <div class="flex flex-col gap-2">
      <p class="text-sm">YYYY-MM-DD</p>
      <div class="flex justify-between items-center text-center">
        <div class="flex gap-3">
          <p class="border border-gray-200 rounded-full bg-gray-200 text-sm px-2">서울</p>
          <p class="m-auto">제목</p>
          <p class="text-sm font-bold text-[#d10000] m-auto">[댓글수]</p>
        </div>
        <div class="flex gap-3 text-sm">
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
      <hr class="border-t border-gray-300 mt-2" />
    </div>

    <div class="relative group">
      <!-- 이미지 -->
      <img src="https://via.placeholder.com/300" alt="Sample Image" class="w-full h-auto" />

      <!-- 텍스트, hover 시에만 보이도록 설정 -->
      <div class="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 text-white bg-black bg-opacity-50 transition-opacity duration-300">
        <p class="text-xl font-bold">마우스를 올려보세요!</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
