import axios from 'axios';


const instance = axios.create({
    baseURL:"https://api-jeu-bourse.herokuapp.com/api",
});

export default instance;