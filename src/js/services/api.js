import axios from 'axios';
const API_KEY = '10456559-0f017c1b081538875f387541b';

export const getImages = ({ query, page }) => {
  const url = `https://pixabay.com/api/?image_type=photo&q=${query}&per_page=12&page=${page}&key=${API_KEY}`;

  return axios
    .get(url)
    .then(res => res.data.hits)
    .catch(err => console.log('axios err : ', err));
};