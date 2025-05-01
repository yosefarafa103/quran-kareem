import axios, { AxiosResponse } from "axios";

export const getData = async (url: string) => {
  try {
    const data: AxiosResponse = await axios.get(`${url}`);
    return data?.data;
  } catch (err) {
    throw new Error(err as any);
  }
};
