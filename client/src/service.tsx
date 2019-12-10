import axios from 'axios';
import config from './config';

const SERVER = axios.create({
    baseURL: config.API_ROUTE,
});

export async function getSalaryPrediction(params: { experience: number }) {
    const response = await SERVER.get(`/predict?experience=${ params.experience }`);
    return response;
}

  