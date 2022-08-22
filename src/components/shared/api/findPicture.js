import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '28740623-faa9572de77969117d7ae64be',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export async function findPicture(query, page = 1) {
  const response = await instance.get('/', {
    params: {
      page: page,
      q: query,
    },
  });
  return response;
}
