import React from "react";

const FileInput = ({ label, accept, onChange,name }) => {
  return (
    <div className="file-input">
      <label htmlFor="">{label}:</label>
      <input id={name} name={name} type="file" accept={accept} onChange={onChange} />
    </div>
  );
};

export default FileInput;
