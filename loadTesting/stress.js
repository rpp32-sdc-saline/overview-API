import http from "k6/http";
import { sleep } from "k6";

const minId = 0;
const maxId = 1000012;

//Stress Test
export const options = {
  stages: [
    { duration: "1m", target: 1000 },
  ],
  // insecureSkipTLSVerify: true,
  // noConnectionReuse: false,
};

//Spike
// export const options = {
//   vus: 250,
//   duration: '1m',
// };

export default function () {
  http.get(`http://localhost:3000/overview/${Math.floor(Math.random() * (maxId - minId) + minId)}`);
  sleep(1);
}
