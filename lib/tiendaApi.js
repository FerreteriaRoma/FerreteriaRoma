import axios from 'axios';

const tiendaApi = axios.create({
  baseURL: 'https://secure.epayco.co',  // Base URL para la API de ePayco
  headers: {
    'Content-Type': 'application/json',
  },
});

export default tiendaApi;
