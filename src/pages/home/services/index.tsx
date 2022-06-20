import axios from 'axios';
import { api } from 'services/api';

class HomeServices {
  getInfo = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/` + 'posts');
    // return api.get(url);
  };

  addInfo = (data: any) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/` + 'posts', data);
  };

  updateInfo = (data: any) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/` + `posts/${data?.id}/`, data);
  };

  deleteInfo = (id: number) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/` + `posts/${id}/`);
  };
}

const homeServices = new HomeServices();
export default homeServices;
