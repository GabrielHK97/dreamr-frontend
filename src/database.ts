import axios from "axios";

export function getDatabase() {
    const database = axios;
    database.defaults.baseURL = process.env.REACT_APP_API_URL;
    return database;
}