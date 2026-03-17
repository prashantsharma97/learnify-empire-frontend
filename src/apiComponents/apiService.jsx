import { data } from 'autoprefixer';
import axios from 'axios';

// const token = localStorage.getItem("token");

// const API = axios.create({
//   baseURL: import.meta.env.VITE_APP_BASE_URL,
//   headers: {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   }
// });

const getAuthToken = () => {
  return localStorage.getItem('token'); // Fetch token from localStorage
};

// Create a new axios instance with a base URL and headers
const API = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an Axios interceptor to include the token in the Authorization header
API.interceptors.request.use(
  (config) => {
    const token = getAuthToken();  // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to each request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// my other CRUD APIs here all methods 
export const getCourses = () => API.get('/instructor/get-courses');
export const getCoursesById = (id) => API.get(`/instructor/get-course/${id}`);
export const createCourse = (data) => API.post('/instructor/upload-course', data);
export const updateCourse = (id, data) => API.put(`/instructor/update-course/${id}`, data);
export const deleteCourse = (id) => API.delete(`/instructor/delete-course/${id}`);
// user setting
export const getInstructorDetails = (id, data) => API.get(`/instructor/instructor-details`);
export const updateInstructorDetails = (data) => API.put('/instructor/update-instructor-details', data);
export const changePassword = (id, data) => API.put(`/instructor/change-password/${id}`, data);

export default API;
