import React from "react";
import { useState } from "react";

function TodoList() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs"));
    return storageJobs;
    //   } ?? []);
  });
  //?? toán tử này khi về trước là null hoặc undefined thì nó sẽ lấy vế sau

  const handleSubmit = () => {
    setJobs((prevJobs) => {
      const newJobs = [...prevJobs, job];

      //Save to localStorage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);

      return newJobs;
    });
    setJob("");
  };

  return (
    <div>
      <input value={job} onChange={(e) => setJob(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
