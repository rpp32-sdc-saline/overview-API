import http from "k6/http";
import { sleep } from "k6";

const minId = 900000;
const maxId = 1000012;

export const options = {
  stages: [
    { duration: "30s", target: 1 },
    // { duration: "1m", target: 10 },
    // { duration: "3m", target: 10 },
    // { duration: "2m", target: 100 },
    // { duration: "3m", target: 100 },
    // { duration: "2m", target: 0 },
  ],
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
};

export default function () {
  http.get(`http://localhost:3000/overview/${Math.floor(Math.random() * (maxId - minId) + minId)}`);
  sleep(1);
}
