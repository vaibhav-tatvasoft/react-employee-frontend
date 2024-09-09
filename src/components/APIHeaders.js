function APIHeaders({ onChange, value, name }) {
  return (
    <div className="api-headers">
      <label>Header</label>
      <input
        name={name}
        type="text"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default APIHeaders;