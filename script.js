import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 200,
  duration: "300s",
  rps: 2000
};

export default function() {
  const queryStrings = ['car', 'bacon', 'cotton', 'awesome', 'bike', 'intelligent', 'concrete', 'fresh', 'tasty', 
  'metal', 'wooden', 'unbranded', 'practical', 'handmade', 'Tasty', 'Steel', 'Ergonomic', 'Gorgeous', 'computer', 
  'gloves', 'Granite', 'Table', 'Salad', 'Towels', 'Shoes', 'small', 'refined'];

  const query = queryStrings[Math.floor(Math.random() * queryStrings.length)];
  http.get(`http://localhost:3003/products/all/${query}`);
};