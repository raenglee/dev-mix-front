import axios from 'axios';
// import { GLOBAL_URL } from './util';

// const url = 'http://192.168.0.61:8080';
const url = 'http://localhost:8080';
// const url = GLOBAL_URL

export const loginUsers = async () => {
  try {
    const res = await axios.get(`${url}/api/v1/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const userProfile = async (userProfileData, profileImage) => {
  try {
    const formData = new FormData(); // FormData를 사용하여 파일과 데이터를 함께 전송
    formData.append('userProfile', new Blob([JSON.stringify(userProfileData)], { type: 'application/json' })); // userProfile 데이터
    if (profileImage) {
      formData.append('profileImage', profileImage); // 프로필 이미지가 있을 경우 추가
    }

    const res = await axios.put(`${url}/api/v1/users/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // multipart/form-data로 설정
        Authorization: `Bearer ${localStorage.getItem('token')}` // 인증 토큰 추가
      }
    });
    // 성공적으로 업데이트된 데이터 반환
    console.log('소셜 로그인 및 사용자 정보 저장 성공:', res.data);
    return res.data; // 성공적으로 저장된 데이터 반환
  } catch (err) {
    console.error('소셜 로그인 및 사용자 정보 저장 실패:', err);
    throw err; // 에러를 다시 던져서 호출자에게 전달
  }
};


// // 닉네임 중복 확인
// export const checkNickname = async (nickname) => {
//   try {
//     const res = await axios.get(`${url}/api/v1/users/nickname-check`, {
//       params: { nickname }, // 쿼리 파라미터로 닉네임 전달
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     console.log('닉네임 중복 확인 결과:', res.data);
//     return res.data; // 사용 가능 여부를 반환
//   } catch (err) {
//     console.error('닉네임 중복 확인 실패:', err);
//     throw err; // 에러를 다시 던져서 호출자에게 전달
//   }
// };



// 사용자 정보 삭제
export const deleteUser = async () => {
  try {
    const res = await axios.delete(`${url}/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // 인증 토큰 추가
      }
    });
    console.log('사용자 정보 삭제 성공:', res.data);
    return res.data;
  } catch (err) {
    console.error('사용자 정보 삭제 실패:', err);
    return err;
  }
};
