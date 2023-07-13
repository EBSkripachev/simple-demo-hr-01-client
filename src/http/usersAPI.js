import { BASE_URL } from '../utils/consts';
import axios from 'axios';

export const fetchAllUsers = async () => {
    const responce = await axios.get(BASE_URL + "/users")
    return responce.data
}

