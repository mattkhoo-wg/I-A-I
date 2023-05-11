import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import axios from 'axios';

const serverUrl = 'http://localhost:8080';
// api/posts/
const calendarEndpoint = `${serverUrl}/bonding-journal`;
const emotionPostEndpoint = `${serverUrl}/emotion-post`;
const GratitudePostEndpoint = `${serverUrl}/gratitude-post`;

const getBJPosts = (date) => axios.get(`${calendarEndpoint}/`, {date:date});

const addEmotionPost = (date, type, content, emotion) => axios.post(`${emotionPostEndpoint}/add-emotion-post`, {data:date, type:type, content:content, emotion:emotion});

const addGratitudePost = (date, type, content) => axios.post(`${serverUrl}/add-gratitude-post`, {date:date, type:type, content:content});

const UserService = {
  getBJPosts,
  addEmotionPost,
  addGratitudePost,
};

export default UserService;