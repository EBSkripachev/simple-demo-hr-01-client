import axios from "axios";
import { BASE_URL } from '../utils/consts';

export const $host = axios.create({
    baseURL: BASE_URL
})