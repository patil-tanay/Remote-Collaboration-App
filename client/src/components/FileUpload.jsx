import React from "react";
import { IconButton } from "@mui/material";
import AttachFile from "@mui/icons-material/AttachFile";

export default function FileUploadButton() {
  const fileInputRef = React.useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    // Handle the file upload here
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      // The file was successfully uploaded
      // `data.fileUrl` is the URL to the uploaded file
      // Emit a socket event with the URL
      socket.emit("share file", data.fileUrl);
    } else {
      // The file upload failed
      console.error("File upload failed");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <IconButton color="primary" onClick={handleClick}>
        <AttachFile />
      </IconButton>
    </div>
  );
}
