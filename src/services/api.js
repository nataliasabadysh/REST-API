import axios from 'axios';
const API_KEY = '10456559-0f017c1b081538875f387541b';

export const fetchImages = ({ query, count, page }) => {
  const url = `https://pixabay.com/api/?image_type=photo&q=${query}&per_page=${count}&page=${page}&key=${API_KEY}`;

  return axios
    .get(url)
    .then(res => res.data.hits)
    .catch(err => console.log('axios err : ', err));
};