import axios from 'axios';

const SERVER = axios.create({
    baseURL: 'http://localhost:5000',
});

export async function getSalaryPrediction(params: { experience: number }) {
    const response = await SERVER.get(`/predict?experience=${ params.experience }`);
    return response;
}

  