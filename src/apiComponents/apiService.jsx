import { data } from 'autoprefixer';
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
export const getCourses = () => API.get('/instructor/get-courses');
export const getCoursesById = (id) => API.get(`/instructor/get-course/${id}`);
export const createCourse = (data) => API.post('/instructor/upload-course', data);
export const updateCourse = (id, data) => API.put(`/instructor/update-course/${id}`, data);
export const deleteCourse = (id) => API.delete(`/instructor/delete-course/${id}`);
// user setting
export const updateInstructorDetails = (id, data) => API.get(`/instructor/instructor-details/${id}`, data);
export const changePassword = (id, data) => API.put(`/instructor/change-password/${id}`, data);

export default API;
