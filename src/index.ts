import "./css/style.css";
import { sum } from "./sum";

sum(2, 3);

const h1 = document.body.querySelector("h1") as HTMLElement;
h1.textContent = "Hello, pal";
