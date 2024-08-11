export class ActiveRecordError extends Error { }

Object.defineProperty(ActiveRecordError.prototype, "name", {
  value: "ActiveRecordError"
});
