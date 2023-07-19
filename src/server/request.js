import axios from "axios";
import { ENDPOINT } from "../const";

export const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
});
