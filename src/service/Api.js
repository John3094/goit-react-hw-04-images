import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '30810115-52ef4f114e7fdb651b12fd85a',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const config = {
    params: {
      q: query,
      page: page,
    },
  };
  const response = await axios.get('', config);
  return response.data;
};
