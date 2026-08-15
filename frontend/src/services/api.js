import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Interceptor to inject JWT token into authorization header
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('fitmern_user') || 'null');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const registerApi = (data) => API.post('/users/register', data);
export const loginApi = (data) => API.post('/users/login', data);
export const logoutApi = () => API.post('/users/logout');
export const getProfileApi = () => API.get('/users/profile');
export const updateProfileApi = (data) => API.put('/users/profile', data);

// Workout APIs
export const getExercisesApi = (params) => API.get('/workouts/exercises', { params });
export const createExerciseApi = (data) => API.post('/workouts/exercises', data);
export const getWorkoutsApi = () => API.get('/workouts/workouts');
export const logWorkoutApi = (data) => API.post('/workouts/workouts', data);
export const deleteWorkoutApi = (id) => API.delete(`/workouts/workouts/${id}`);
export const getWeightEntriesApi = () => API.get('/workouts/weight-entries');
export const logWeightEntryApi = (data) => API.post('/workouts/weight-entries', data);

// Nutrition APIs
export const getFoodsApi = (params) => API.get('/nutrition/foods', { params });
export const createFoodApi = (data) => API.post('/nutrition/foods', data);
export const getMealsApi = () => API.get('/nutrition/meals');
export const logMealApi = (data) => API.post('/nutrition/meals', data);
export const deleteMealApi = (id) => API.delete(`/nutrition/meals/${id}`);

// Goal APIs
export const getGoalsApi = () => API.get('/goals/goals');
export const createGoalApi = (data) => API.post('/goals/goals', data);
export const updateGoalApi = (id, data) => API.put(`/goals/goals/${id}`, data);
export const deleteGoalApi = (id) => API.delete(`/goals/goals/${id}`);

// Progress APIs
export const getProgressEntriesApi = () => API.get('/progress/progress-entries');
export const logProgressEntryApi = (data) => API.post('/progress/progress-entries', data);
export const getBodyMeasurementsApi = () => API.get('/progress/body-measurements');
export const logBodyMeasurementApi = (data) => API.post('/progress/body-measurements', data);

// Gemini AI Chatbot API
export const postAIChatApi = (data) => API.post('/ai/chat', data);

export default API;
