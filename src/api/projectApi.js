import axios from 'axios';
// import { GLOBAL_URL } from './util';

// const url = 'http://192.168.0.61:8080/api/v1/boards';
const url = 'http://localhost:8080/api/v1/boards';
// const url = `${GLOBAL_URL}/api/v1/boards`;

export const getProjectView = async (board_id) => {
  // console.log('게시판 주소: ', `${url}/${board_id}`);
  try {
    const res = await axios.get(`${url}/${board_id}`, 
  );
    
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const saveProject = async (data) => {
  // console.log('저장axios 호출');
  // console.log('토큰: ', localStorage.getItem('token'));
  try {
    const res = await axios.post(`${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('저장', res);
    return res;
  } catch (e) {
    console.log('저장 Api 에러 발생:', e.response ? e.response.data : e.message);
    // console.log(res.data);
    return e;
  }
};

export const deleteProject = async (board_id) => {
  try {
    const res = await axios.delete(`${url}/${board_id}`);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const patchProject = async (board_id) => {
  try {
    const res = await axios.patch(`${url}/${board_id}`);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const listProject = async (pageNumber = 1, pageSize = 16) => {
  if (pageNumber == undefined) pageNumber = 0; // 예외방지

  try {
    const res = await axios.get(`${url}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    // console.log('리스트 가져오기 axios 연결: ', res);
    return res.data.result;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getTechstacks = async () => {
  try {
    const res = await axios.get(`${url}/tech-stacks`);
    // console.log('getTechstacks axios호출: ', res);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getPositions = async () => {
  try {
    const res = await axios.get(`${url}/positions`);
    // console.log('getPositions axios호출: ', res);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getLocation = async () => {
  try {
    const res = await axios.get(`${url}/locations`);
    // console.log('getLocations axios호출: ', res);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 댓글 로드
export const getCommentsView = async (board_id) => {
  try {
    const res = await axios.get(`${url}/${board_id}/comments`);
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
