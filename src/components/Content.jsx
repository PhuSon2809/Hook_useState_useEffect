/**
 * Events: Add/remove event listener
 * Observer pattern: Subcribe / unsubscribe
 * Closure
 * Timers: setInterval, setTimeout, clearInterval, clearTimeout
 * useState
 * mounted/Unmounted
 * ===
 * Call API
 */

/**
 * 1. Update DOM
 *   - F8 blog title
 * 2. Call API
 * 3. Listen DOM events
 *   - Scroll
 *   - Resize
 * 4. Cleanup
 *   - Remove listener / Unsubcribe
 *   - clear timer
 */

//useEffect(callback, [deps]) --> callback: bắt buộc, [deps]: ko bắt buộc
//1. useEffect(callback)
/**
 * - Gọi callback mỗi khi component re-render
 * - Gọi callback sau khi component thêm emlement vào DOM
 */
//2. useEffect(callback, [])
//Chỉ gọi callback 1 lần sau khi component mounted
//3. useEffect(callback, [deps])
// - Callback sẽ được gọi lại mỗi khi deps thay đổi
/**
 * 1. Callback luôn được gọi sau khi component mounted
 * 2. Cleanup function luôn được gọi trước khi component unmounted
 * 3. Cleanup function luôn được gọi truowsc khi callback được gọi gọi (trừ lần mounted)
 */

//Ưu tiện tạo giao diện cho người dùng
//Mỗi khi setState thì sẽ render lại component

//Dùng useEffect khi muốn thực hiện các side effect
import React, { useEffect, useState } from "react";

const tabs = ["posts", "comments", "albums"];

function Content() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  const [showGoToTop, setShowGoToTop] = useState(false);

  console.log(type);
  //In ra 2 lần: 1 là bấm toggle gọi đến component này được mounted
  // 2 là khi gọi API setState render lại component

  // useEffect(() => {
  //   document.title = title;
  // });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        //show
        setShowGoToTop(true);
      } else {
        //hide
        setShowGoToTop(false);
      }

      // setShowGoToTop(window.scrollY >= 200);
    };

    window.addEventListener("scroll", handleScroll);
    //khi component unmounted r thì cái event trên nó không hề bị unmounted

    //Gọi trv component unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [countdown, setCountdown] = useState(180);
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((prevState) => prevState - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCountdown(countdown -1);
  //   }, 1000);
  // }, [countdown]);

  return (
    <div>
      <h1>Countdown: {countdown}</h1>

      <h1>WIDTH: {width}</h1>

      {tabs.map((tab) => (
        <button
          key={tab}
          style={
            type === tab
              ? {
                  color: "#fff",
                  backgroundColor: "#333",
                }
              : {}
          }
          onClick={() => setType(tab)}
        >
          {tab}
        </button>
      ))}

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title || post.name}</li>
        ))}
      </ul>

      {showGoToTop && (
        <button
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
        >
          Go to top
        </button>
      )}
    </div>
  );
}

export default Content;
