<template>
  <div class="bg-white">
    <!--🟥메인 박스-->
    <section class="container mx-auto py-8 w-4/6">
      <h1 class="text-4xl font-bold text-center mb-6 animate-slideUp py-10 text-gray-800">현재 모집 중인 프로젝트를 확인해보세요!</h1>

      <!--🔍서치 박스-->
      <div class="flex items-center justify-between mb-3">
        <div class="flex gap-4">
          <div class="flex">
            <!-- 지역/구분 드롭다운 -->
            <div class="relative">
              <!-- 드롭다운 버튼 -->
              <div
                @click="toggleDropdown('location')"
                class="min-w-36 max-w-36 max-h-10 px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none flex items-center justify-between"
              >
                <span class="truncate w-full" v-if="selectedLocation">{{ selectedLocation }}</span>
                <span class="truncate w-full text-gray-800" v-else>지역 / 구분</span>
                <!-- 화살표 아이콘: 박스 오른쪽에 고정 -->
                <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
              </div>

              <!-- 드롭다운 내용 -->
              <div v-if="activeDropdown === 'location'" class="absolute bg-white border border-gray rounded-md shadow-lg z-10 w-64 p-4">
                <div class="flex flex-col">
                  <div v-for="(option, index) in locationOptions" :key="index" class="flex items-center p-1">
                    <label :class="{ 'text-gray-400': selectedLocation === option }" @click="selectLocation(option)" class="cursor-pointer truncate w-full">
                      {{ option }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 포지션 드롭다운 -->
          <div class="relative">
            <!-- 드롭다운 버튼 -->
            <div
              @click="toggleDropdown('position')"
              class="min-w-36 max-w-36 max-h-10 px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none flex items-center justify-between"
            >
              <span class="truncate w-full" v-if="selectedPosition">{{ selectedPosition.positionName }}</span>
              <span class="truncate w-full text-gray-800" v-else>포지션</span>
              <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
            </div>

            <!-- 드롭다운 내용 -->
            <div v-if="activeDropdown === 'position'" class="absolute bg-white border border-gray rounded-md shadow-lg z-10 w-64 p-4">
              <div class="flex flex-col">
                <div v-for="(option, index) in positionOptions" :key="index" class="flex items-center p-1">
                  <label :class="{ 'text-gray-400': selectedPosition === option }" @click="selectPosition(option)" class="cursor-pointer truncate w-full">
                    {{ option.positionName }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 기술/언어 드롭다운 -->
          <div class="relative">
            <div @click="toggleDropdown('tech')" class="min-w-36 max-w-36 max-h-10 px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none">
              <span class="text-gray-800">기술 / 언어</span>
              <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
            </div>
            <div v-if="activeDropdown === 'tech'" class="absolute bg-white border border-gray rounded-md z-20 p-4 shadow" style="width: 600px">
              <!--드롭다운 내부-->
              <div class="flex gap-2">
                <button type="button" class="bg-whith border border-gray-200 px-2 py-1 rounded-full text-sm hover:bg-gray-300">전체</button>
                <button type="button" class="bg-whith border border-gray-200 px-2 py-1 rounded-full text-sm hover:bg-gray-300">백 엔드</button>
                <button type="button" class="bg-whith border border-gray-200 px-2 py-1 rounded-full text-sm hover:bg-gray-300">프론트 엔드</button>
              </div>

              <div class="grid grid-cols-10 gap-x-3 gap-y-3 mt-3">
                <div v-for="(option, index) in techOptions" :key="index" class="flex items-center m-auto">
                  <label :class="{ 'text-gray-300 opacity-20': selected.includes(option) }" @click="toggleTechSelection(option)" class="cursor-pointer">
                    <!--마우스 오버 이름표시-->
                    <div class="relative group">
                      <img :src="option.imageUrl" class="w-10 h-12 object-contain transition-all duration-300 group-hover:w-12" />
                      <div class="absolute z-10 inset-0 flex justify-center items-center left-12 bottom-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-sm font-bold bg-gray-400 text-white rounded-lg p-1">{{ option.techStackName }}</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div class="mt-5">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold mb-1">선택 항목</span>
                  <button @click="resetSelection" type="button" class="text-sm text-gray-400 px-1 mb-1 cursor-pointer hover:text-gray-300">초기화</button>
                </div>
                <div class="flex flex-wrap">
                  <span v-for="(item, index) in selected" :key="index" class="mr-3 border border-gray-200 text-sm rounded-full px-2 py-1 mt-1">
                    <p>{{ item.techStackName }}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            class="min-w-36 max-h-8 px-4 py-1 my-5 border border-[#d10000] rounded-full outline-none text-gray-800"
            :class="{
              'bg-[#d10000] text-white': onlyBookmarked,
              'bg-white text-black': !onlyBookmarked
            }"
            @click="clickBookmarkonly"
          >
            북마크만 보기
          </button>

          <button
            class="min-w-36 max-h-8 px-4 py-1 my-5 border border-[#d10000] rounded-full outline-none text-gray-800"
            :class="{
              'bg-[#d10000] text-white': onlyNeeded,
              'bg-white text-black': !onlyNeeded
            }"
            @click="clickneededonly"
          >
            모집중만 보기
          </button>
        </div>

        <div class="flex items-center border border-gray-300 rounded-full px-4 py-1">
          <input type="text" placeholder="# 검색어를 입력하세요" class="flex-grow focus:outline-none" v-model="searchText" />
          <button><img src="/img/search.png" class="h-5 w-5" /></button>
        </div>
      </div>
      <!--서치 박스 끝-->

      <!--📝프로젝트 글 박스-->
      <template v-if="arr && arr.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
          <div v-for="item in arr" :key="item.id" class=" cursor-pointer border rounded-2xl p-4 relative project-card " @click="viewPage(item.boardId)">
            <!-- {{ console.log(item) }} -->
            <div class="top-4 flex items-center justify-between">
              <div class="border px-2 rounded-full mb-2 bg-gray-200 text-gray-800">{{ item.location }}</div>
              <font-awesome-icon
                :icon="item.isBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']"
                :class="[item.isBookmarked ? 'text-[#7371fc]' : 'text-gray-400', 'cursor-pointer']"
                style="font-size: 22px"
                @click.stop="toggleBookmark(item)"
              />
            </div>
            <div class="text-sm mb-2 text-gray-800">모집 마감일 | {{ item.recruitEndDate }}</div>
            <div class="text-xl font-bold mb-2 text-gray-800">{{ item.title }}</div>
            <!--기술 아이콘-->
            <div class="flex pt-2 gap-3 mb-1">
              <div v-for="tech in item.techStacks" :key="tech">
                <img class="w-10 h-10" :src="tech.techStackImageUrl" />
              </div>
            </div>
            <div class="flex flex-col">
              <p class="flex-grow text-right text-sm py-2 text-gray-800" v-if="item.createdBy">{{ item.createdBy }}</p>
              <p class="flex-grow text-right text-sm py-2" v-else>&nbsp;</p>

              <div class="flex justify-between items-center mt-3">
                <!-- 인원 정보 (0 / 총 인원) -->
                <div class="relative group">
                  <!-- 인원 0 / 총 인원 표시 -->
                  <div class="text-sm cursor-pointer text-gray-800">인원 {{ item.currentCount }} / {{ item.totalRequiredCount }}</div>
                  <!-- 개별 인원 수 출력, 마우스를 올리면 나타나도록 -->
                  <div
                    class="absolute z-10 bg-white left-14 bottom-2 p-2 shadow-lg rounded-xl mt-2 w-auto whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300"
                  >
                    <div v-for="count in item.positions" :key="count.positionName" class="text-sm my-1 m-auto">
                      <span class="font-bold rounded-md px-1 text-gray-800">{{ count.positionName }} -</span>{{ count.requiredCount }}명
                    </div>
                  </div>
                </div>
                <!-- 조회수와 댓글 수 -->
                <div class="flex text-sm items-center gap-1 text-gray-800">
                  <font-awesome-icon icon="eye" class="text-gray-400 ml-1" />
                  {{ item.viewCount }}
                  <font-awesome-icon icon="comment" class="text-gray-400 ml-1" />
                  {{ item.commentCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!--프로젝트 글 박스 끝-->

      <div class="text-center mt-10 mb-10">
        <span class="font-semibold text-3xl text-gray-800"> 현재 DEVMIX에서 모집 중인 프로젝트 <span class="text-[#D10000]">N</span>건</span>
      </div>

      <!--페이지 수-->
      <div class="flex justify-center mt-5">
        <ul class="flex space-x-2">
          <li class="cursor-pointer p-3 text-gray-800" v-for="(num, index) in totalPages" v-bind:key="index" @click="getProjects(num)">
            {{ num }}
          </li>
        </ul>
      </div>
    </section>
  </div>

  <div class="bottom bg-[#d10000] bottom-0 left-0 w-full text-white text-center">DEVMIX</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getLocation, getPositions, getTechstacks, listProject } from '@/api/projectApi';
import router from '@/router';

const searchText = ref('');
const onlyBookmarked = ref(false);
const onlyNeeded = ref(false);
const arr = ref([]); // 게시물 배열

// 백에서 토탈 페이지 수 받고나면 수정하기
const totalPages = ref(3);

// 프로젝트 가져오기
const getProjects = async (num = 1) => {
  try {
    const res = await listProject(num);
    // 각 프로젝트에 'isBookmarked'와 'totalRequiredCount' 속성 추가
    arr.value = res.map((item) => {
      const totalRequiredCount = item.positions.reduce((sum, position) => {
        return sum + position.requiredCount;
      }, 0);
      return {
        ...item,
        isBookmarked: false, // 북마크 상태 초기화
        totalRequiredCount // 총 인원 수
      };
    });
    // console.log('프로젝트 내용: ', arr.value);
  } catch (error) {
    console.error('프로젝트 가져오기 오류:', error);
  }
};

// 각 게시글과 연결
const viewPage = (board_id) => {
  const data = { name: 'projectview', params: { board_id: board_id } };
  router.push(data);
};

// 북마크만 보기
const clickBookmarkonly = () => {
  onlyBookmarked.value = !onlyBookmarked.value;
};

// 모집중만 보기
const clickneededonly = () => {
  onlyNeeded.value = !onlyNeeded.value;
};

// 특정 게시물의 북마크 상태 변경
const toggleBookmark = (item) => {
  item.isBookmarked = !item.isBookmarked; // 누른 게시물 북마크 상태 반전
  localStorage.setItem('bookmarkedItems', JSON.stringify(arr.value)); // 로컬 스토리지에 저장
};

// 포지션 드롭다운
const positionOptions = ref([]);
const selectedPosition = ref(''); // 단일 선택

// 포지션 데이터 가져오기
const selectPositions = async () => {
  try {
    const res = await getPositions();
    // console.log('updatePsotions 데이터 확인: ', res);
    if (Array.isArray(res.data.result)) {
      positionOptions.value = res.data.result;
    } else {
      console.error('분야별 모집 인원 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

const selectPosition = (option) => {
  selectedPosition.value = option;
  activeDropdown.value = ''; // 드롭다운 닫기
};

// 기술/언어 드롭다운
const techOptions = ref([]);
const selected = ref([]); // 다중 선택

// 기술/언어 데이터 가져오기
const selelctTechstacks = async () => {
  try {
    const res = await getTechstacks();
    // console.log('updateTechstacks 데이터 확인: ', res);
    // techOptions.value = res.result;
    if (Array.isArray(res.data.result)) {
      techOptions.value = res.data.result.map((item) => ({
        techStackName: item.techStackName,
        imageUrl: item.imageUrl
      }));
    } else {
      console.error('기술/언어 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

const resetSelection = () => {
  selected.value = []; // 선택된 항목을 모두 해제
};

// 지역/구분 드롭다운
const locationOptions = ref([]);
const selectedLocation = ref(''); // 단일 선택

//지역 데이터 가져오기
const selectLocations = async () => {
  try {
    const res = await getLocation();
    // console.log('updateLocations 데이터 확인: ', res);
    if (Array.isArray(res.data.result)) {
      locationOptions.value = res.data.result;
    } else {
      console.error('지역 / 구분 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

const activeDropdown = ref(''); // 현재 활성화된 드롭다운

// 지역 선택
const selectLocation = (option) => {
  selectedLocation.value = option;
  activeDropdown.value = ''; // 드롭다운 닫기
};

// 드롭다운 토글
const toggleDropdown = (dropdown) => {
  activeDropdown.value = activeDropdown.value === dropdown ? '' : dropdown; // 드롭다운 열기/닫기
};

//기술선택 토글?
const toggleTechSelection = (option) => {
  const index = selected.value.indexOf(option);
  if (index === -1) {
    selected.value.push(option);
  } else {
    selected.value.splice(index, 1);
  }
};

// 외부 클릭 시 드롭다운 닫기
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeDropdown.value = ''; // 모든 드롭다운 닫기
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  getProjects();
  selelctTechstacks();
  selectPositions();
  selectLocations();
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});

// page번호 선택했을때 호출하는 함수.
// const selectPageNum = async(num)=>{
//   const res = await listProject(num);
//   // arr.value = res;
//   // 각 프로젝트에 'isBookmarked'와 'totalRequiredCount' 속성 추가
//   arr.value = res.map((item) => {
//       const totalRequiredCount = item.positions.reduce((sum, position) => {
//         return sum + position.requiredCount;
//       }, 0);

//       return {
//         ...item,
//         isBookmarked: false, // 북마크 상태 초기화
//         totalRequiredCount // 총 인원 수
//       };
//     });
//   console.log(res);
// }
</script>
