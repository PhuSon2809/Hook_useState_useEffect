import React, { useEffect, useState } from "react";

function PreviewAvatar() {
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        //cleanup
        return () => {
            //Nếu mà có avatar thì thực hiện đoạn code thứ 2
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

  const handlePreviewAvatar = (event) => {
    const file = event.target.files[0];
    //Chỉ lấy một ảnh đầu tiên được chọn nên thêm [0]
    //file là một obj nên có thẻ tùy ý thêm một propoties vào cho nó
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
    event.target.files = null;
    //--> Giúp chọn nhiều lần trên một cái ảnh cùng tên
  };
  return (
    <div>
      <h1>PreviewAvatar</h1>
      <input
        type="file"
        //multiple Dùng để chọn nhiều ảnh cùng một lúc
        onChange={handlePreviewAvatar}
      />
      <br/>
      {avatar && (
        <img src={avatar.preview} alt="avatar" width="80%"/>
      )}
    </div>
  );
}

export default PreviewAvatar;
