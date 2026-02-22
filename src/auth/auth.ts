import { serverFetch } from "@/utils/server-fetch"

export const getUserInfo = async () => {

    const res = await serverFetch.get("/user/me");
    const data = await res.json();
    return data;
}