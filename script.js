import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: "240s",
  rps: 1000
};

export default function() {
  const queryStrings = ['car', 'bacon', 'cotton', 'awesome', 'bike', 'intelligent', 'concrete', 'fresh', 'tasty', 
  'metal', 'wooden', 'unbranded', 'pratical', 'handmade'];
  const query = queryStrings[Math.floor(Math.random() * queryStrings.length)];
  http.get(`http://localhost:3003/products/all/${query}`);
};