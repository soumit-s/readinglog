import axios from "axios";
import { UserDataSchema } from "./schemas";
import useSWR from "swr";

const BASE_URL = 'http://localhost:8000'
const DEFAULT_CONFIG = {withCredentials: true}

export async function fetchUserData() {
    const { data } = await axios.get(`${BASE_URL}/api/user`, { ...DEFAULT_CONFIG });
    if (data.active_user_present && data.authenticated) {
        return new UserDataSchema(data.data);
    }
}

export function useUser() {
    const { data, isLoading, error} = useSWR('/api/signin', fetchUserData)
    return {
        data,
        isLoading,
        isPresent: data && true,
        error
    }
}