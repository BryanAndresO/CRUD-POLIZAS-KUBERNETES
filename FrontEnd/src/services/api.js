import axios from 'axios';

// Use relative URLs - Nginx will proxy to the appropriate backend service
const clientsService = axios.create({
    baseURL: '/api',
});

const plansService = axios.create({
    baseURL: '/api',
});

const policiesService = axios.create({
    baseURL: '/api',
});

export { clientsService, plansService, policiesService };
