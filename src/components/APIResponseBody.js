import { useEffect, useState } from "react";

function APIResponseBody(props) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (props.responseBodyResult != null) {
      console.log(typeof APIResponseBody + props.responseBodyResult);
      setResponse(JSON.stringify(props.responseBodyResult, null, 2));
    }
  }, [props.responseBodyResult]);

  return (
    <div>
      <label>
        {" "}
        Response Body
        <textarea
          value={response}
          name="responseBody"
          rows={10}
          cols={10}
          readOnly
        ></textarea>
      </label>
    </div>
  );
}

export default APIResponseBody;
