import { useState } from "react";
import ChatApp from "./components/ChatApp";
import Content from "./components/Content";
import PreviewAvatar from "./components/PreviewAvatar";
import TodoList from "./components/TodoList";

const orders = [100, 200, 400];

function App() {
  const total = orders.reduce((total, item) => total + item, 0);

  const [counter, setCounter] = useState(() => {
    const total = orders.reduce((total, item) => total + item, 0);
    console.log(total);
    return total;
  });

  const handleIncrease = () => {
    // setCounter(counter + 1);
    //Có thể nhận 1 cái callback
    setCounter((preState) => preState + 1);
    setCounter((preState) => preState + 1);
    setCounter((preState) => preState + 1);
  };

  const [infor, setInfor] = useState({
    name: "nhuyễn văn A",
    age: 18,
    address: "ha noi",
  });

  const handleupdate = () => {
    setInfor({
      //Toán tử spread
      ...infor,
      bio: "Sinh viên FPT",
    });

    //Trong trường hợp phải xử lý logic
    setInfor((prev) => {
      //logic

      return {
        //Toán tử spread
        ...infor,
        bio: "Sinh viên FPT",
      };
    });
  };

  /**
   * Luu ý:
   *  1. Array
   *  2. Reference types
   *
   * Ví dụ:
   * 1. Random gift
   * 2. Two-way binding (ràng buộc hai chiều)
   * 3. TodoList
   */

  const gifts = ["CPU i9", "RAM 32GB RGB", "RGB keyboard"];
  const [gift, setGift] = useState();
  const handleRandomGift = () => {
    //floor làm tròn xuống
    const index = Math.floor(Math.random() * gifts.length);
    console.log(gifts[index]);
    setGift(gifts[index]);
    //Sau khi setGift thì reactJS sẽ lên lịch trình đưa vào hàng đợi
    //để chờ render lại
  };

  //ReactJS là ràng buộc 1 chiều
  //1 chiều: Là chiều tưởng tác trên giao diện
  // 2 chiều: Là
  //Ràng buộc hai chiều

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    //call API
    console.log({
      name: name,
      email: email,
    });
  };

  //response from API
  const courses = [
    {
      id: 1,
      name: "HTML, CSS",
    },
    {
      id: 2,
      name: "javascript",
    },
    {
      id: 3,
      name: "ReactJS",
    },
  ];

  const [checked, setChecked] = useState(2);
  console.log("ID: ", checked);

  const handleRadio = () => {
    //CALL API
    console.log("ID: ", checked);
  };

  const [checkBox, setCheckBox] = useState([]);
  const handleCheck = (id) => {
    setCheckBox((prev) => {
      const isChecked = checkBox.includes(id);
      if (isChecked) {
        //Uncheck
        return checkBox.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  console.log(checkBox);

  const handleCheckBox = () => {
    //CALL API
    console.log("IDS: ", checkBox);
  };

  const [show, setShow] = useState(false);

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Incre</button>

      <h1>{JSON.stringify(infor)}</h1>
      <button onClick={handleupdate}>Update</button>

      {/* toán tử or */}
      <h1>{gift || "Chưa có phần thưởng"}</h1>
      <button onClick={handleRandomGift}>Lấy thưởng</button>
      <br />

      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Register
      </button>

      {courses.map((course) => (
        <div key={course.id}>
          <input
            type="radio"
            checked={checked === course.id}
            onChange={() => setChecked(course.id)}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleRadio}>Submit</button>

      {courses.map((course) => (
        <div key={course.id}>
          <input
            type="checkbox"
            checked={checkBox.includes(course.id)}
            // includes sẽ trả về true nếu như mảng checkBox có chưa id đó
            onChange={() => handleCheck(course.id)}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleCheckBox}>Submit</button>
      <TodoList/>
        <button onClick={()=> setShow(!show)}>toggle</button>
        {/* Từ khi TodoList được đưa vào App sử dụng khi đó đã là mounted r */}
        {/* Thời điểm nó được gỡ ra khi đó là unmounted */}
        {show && <Content/>}

        <PreviewAvatar/>
        <ChatApp/>
        
    </div>
  );
}
export default App;
