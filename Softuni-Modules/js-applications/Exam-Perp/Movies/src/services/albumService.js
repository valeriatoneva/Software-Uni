import { request } from "./requester.js";

const baseUrl = 'http://localhost:3030/data/albums';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=name`)
