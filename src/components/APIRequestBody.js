import React from "react";

function APIRequestBody({ onChange, value, name }) {
  return (
    <div>
      <label>
        Request Body:
        <textarea
          name={name}
          rows={10}
          cols={30}
          onChange={onChange}
          value={value}
        ></textarea>
      </label>
    </div>
  );
}

export default APIRequestBody;
