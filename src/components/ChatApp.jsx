import React, { useEffect, useState } from "react";

const lessons = [
  {
    id: 1,
    name: "ReactJS là gì? Tạo sao nên học ReactJS?",
  },

  {
    id: 2,
    name: "SPA/MPA là gì?",
  },

  {
    id: 3,
    name: "Arrow function",
  },
];

function ChatApp() {
  const [lessonId, setLessonId] = useState(1);

  useEffect(() => {
    const handleComment = ({detail}) => {
        console.log(detail);
    };

    window.addEventListener(`lesson-${lessonId}`, handleComment);

    return () => {
      window.removeEventListener(`lesson-${lessonId}`, handleComment);
    }
  }, [lessonId]);

  return (
    <div>
      <h1>ChatApp</h1>
      <ul>
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            onClick={() => setLessonId(lesson.id)}
            style={{
              color: lesson.id === lessonId ? "red" : "#333",
              cursor: "pointer",
            }}
          >
            {lesson.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatApp;
