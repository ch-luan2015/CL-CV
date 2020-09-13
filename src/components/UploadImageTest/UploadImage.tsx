import React, { useState, useEffect } from "react";

function UploadImage() {
  const [file, setFile] = useState();

  const handleImage = (e) => {
    console.log("e.target", e.target);
    e.preventDefault();
    var fileImage = e.target.files[0];
    console.log("fileImage", fileImage);
    setFile(fileImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Ban chua chon file");
      return;
    }

    const formData = new FormData();
  };

  console.log("file in state", file);
  return (
    <div className="flex flex-row justify-center align-center ">
      <form>
        <label>Chọn Avatar</label>

        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={(e) => handleImage(e)}
          placeholder="Choose File"
        />
        <input type="submit" onChange={(e) => handleSubmit(e)} />
      </form>
    </div>
  );
}

export default UploadImage;
