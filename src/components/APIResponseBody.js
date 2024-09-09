import React, { useEffect, useState } from "react";

function APIResponseBody(props) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (props.responseBodyResult !== null) {
      console.log("Response Type:", typeof props.responseBodyResult);
      console.log("Response Data:", props.responseBodyResult);
      setResponse(JSON.stringify(props.responseBodyResult, null, 2));
    }
  }, [props.responseBodyResult]);

  return (
    <div>
      <label>
        Response Body:
        <textarea
          value={response}
          name="responseBody"
          rows={10}
          cols={30}
          readOnly
        ></textarea>
      </label>
    </div>
  );
}

export default APIResponseBody;
