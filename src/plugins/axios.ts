import axios from 'axios';

const axiosInst = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInst;
