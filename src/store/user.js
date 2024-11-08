import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    loginCheck: false, // 로그인 상태
    username: '', // 사용자 이름
    nickname: '', // 닉네임
    email: '', // 이메일
    groupName: '', // 그룹명 (프로필 관련)
    location: '', // 위치
    positionList: '', // 직무 리스트
    techStackList: '', // 기술 스택 리스트
    profileImage: '' // 프로필 이미지
  }),
  actions: {
    login(data) {
      this.loginCheck = true;
      this.nickname = data.nickname; 
      this.username = data.username; 
      this.email = data.email; 
    },

    logout() {
      this.loginCheck = false;
      this.username = '';
      this.nickname = '';
      this.email = '';
      this.groupName = '';
      this.location = '';
      this.positionList = '';
      this.techStackList = '';
      this.profileImage = '';
      localStorage.removeItem('token');
    },
    
    profile(data) {
      this.loginCheck = true;
      this.nickname = data.nickname; 
      this.email = data.email; 
      this.groupName = data.groupName; 
      this.location = data.location; 
      this.positionList = data.positionList; 
      this.techStackList = data.techStackList; 
      this.profileImage = data.profileImage;
    }
  },
  persist: true
});
