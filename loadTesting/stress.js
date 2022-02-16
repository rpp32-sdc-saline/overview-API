import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 1 },
    { duration: "2m", target: 10 },
    { duration: "5m", target: 10 },
    { duration: "2m", target: 100 },
    { duration: "5m", target: 100 },
    { duration: "2m", target: 1000 },
    { duration: "5m", target: 1000 },
    { duration: "10m", target: 0 },
  ],
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
};

export default function () {
  http.get("http://localhost:3000/overview/10000");
  sleep(1);
}
