import React, { useState, useEffect } from "react";

function UploadImage() {
  const [fileImage, setFileImage] = useState({
    name: "",
    file: "",
  });

  const handleChangeImage = (e) => {
    setFileImage({
      name: e.target.files[0].name,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", fileImage.file);
    formData.append("name", fileImage.name);
    await fetch("https://cdn.linhtinh.tech/admin/image", {
      method: "PUT",
      body: formData,
    }).then((response) => {});
  };

  return (
    <div className="flex flex-row justify-center align-center ">
      <form>
        <label>Chọn Avatar</label>

        <input
          type="file"
          id="upload-button"
          onChange={handleChangeImage}
          placeholder="Choose File"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          UpLoad
        </button>
      </form>
    </div>
  );
}

export default UploadImage;
