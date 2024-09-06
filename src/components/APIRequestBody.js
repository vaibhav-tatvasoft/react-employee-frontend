import { useState } from "react";

function APIRequestBody() {
  return (
    <div>
      <label>
        {" "}
        requestBody
        <textarea name="requestBody" rows={10} cols={10}></textarea>
      </label>
    </div>
  );
}

export default APIRequestBody;
