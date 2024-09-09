import APIResponseBody from "./APIResponseBody";

export default function APIResponse(props) {
  return (
    <div className="APIResponse">
      <APIResponseBody responseBodyResult={props.responseBodyResult}></APIResponseBody>
      <input
        name="responseHeaders"
        placeholder="response headers will be displayed here"
        type="textbox"
      ></input>
    </div>
  );
}
