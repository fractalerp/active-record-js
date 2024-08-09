class ActiveRecordError extends Error { }

Object.defineProperty(ActiveRecordError.prototype, "name", {
  value: "ActiveRecordError"
});

export { ActiveRecordError };
