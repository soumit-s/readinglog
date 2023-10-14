import axios from "axios";
import { UserDataSchema } from "./schemas";
import useSWR from "swr";

const BASE_URL = 'http://localhost:8000'
const DEFAULT_CONFIG = { withCredentials: true }

export async function fetchUserData() {
    const { data } = await axios.get(`${BASE_URL}/api/user`, { ...DEFAULT_CONFIG });
    if (data.active_user_present && data.authenticated) {
        return new UserDataSchema(data.data);
    }
}

export function useUser() {
    const { data, isLoading, error } = useSWR('/api/signin', fetchUserData)
    return {
        data,
        isLoading,
        isPresent: data && true,
        error
    }
}

export function postEditUserInfo({ name, bio }) {
    return axios.post(`${BASE_URL}/api/user/edit`, {
        name,
        bio
    }, { ...DEFAULT_CONFIG })
}

export function postCreateLog({ title, content, words }) {
    return axios.post(`${BASE_URL}/api/log/new`, {
        title, content, words
    }, { ...DEFAULT_CONFIG })
}

export async function fetchLogs() {
    const { data } = await axios.get(`${BASE_URL}/api/user/logs`, { ...DEFAULT_CONFIG })
    return data
}

export function useLogs() {
    const { data, isLoading, error } = useSWR('/api/user/logs', fetchLogs)
    return {
        data, isLoading, error, logs: data && data.ok && data.logs
    }
}

export async function fetchLog(id) {
    const { data } = await axios.get(`${BASE_URL}/api/log/${id}`, { ...DEFAULT_CONFIG })
    return data
}

export function useLog(id) {
    const { data, isLoading, error } = useSWR(`/api/log/${id}`, () => fetchLog(id))
    return {
        isLoading, error, data: data && data.ok && data.data
    }
}

export function deleteLog({ id }) {
    return axios.delete(`${BASE_URL}/api/log/delete`, { params: { id }, ...DEFAULT_CONFIG })
}

export function postSaveLog({ id, title, content, words }) {
    return axios.post(`${BASE_URL}/api/log/update`, { id, title, content, words }, { params: { id }, ...DEFAULT_CONFIG })
}