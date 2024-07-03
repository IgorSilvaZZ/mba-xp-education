import axios from "axios";

export const apiCoin = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});
