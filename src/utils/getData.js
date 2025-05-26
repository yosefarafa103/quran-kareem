import axios from "axios";
export const getData = async (url) => {
    try {
        const data = await axios.get(`${url}`);
        return data?.data;
    }
    catch (err) {
        throw new Error(err);
    }
};
