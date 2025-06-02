import axios from 'axios';

const API = axios.create({
  baseURL:  import.meta.env.VITE_APP_BASE_URL,
  headers: {
      'Content-Type': 'application/json',
    }
});

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// my other CRUD APIs here all methods 
// export const getCourses = () => API.get('/courses');
// export const createCourse = (data) => API.post('/courses', data);
// export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);
// export const deleteCourse = (id) => API.delete(`/courses/${id}`);

export default API;
