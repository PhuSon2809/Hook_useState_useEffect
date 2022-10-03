import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//Fake comments
//Custom event để phát đi một event tùy ý
function emitComment(id) {
  setInterval(() => {
    //dispatchEvent trong phạm vi window nên bất cứ
    //ở file nào cũng có thể lắng nghe đc event này
    window.dispatchEvent(
      new CustomEvent(`lesson-${id}`, {
        detail: `Nội dung comments của lesson ${id}`,
      })
    );
  }, 2000);
}

emitComment(1)
emitComment(2)
emitComment(3)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
