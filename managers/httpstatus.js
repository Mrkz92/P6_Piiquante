class HttpStatus extends Error {
  constructor(code, ...params) {
    let asJson = false;
    if (typeof params[0] !== "string") {
      params[0] = JSON.stringify(params[0]);
      asJson = true;
    }
    super(...params);
    if (Error.captureStackTrace) Error.captureStackTrace(this, HttpStatus);
    this.code = code;
    this.asJson = asJson;
  }
}
const sendStatus = (code, message) => () => {
  throw new HttpStatus(code, message);
};

function statusMW(error, req, res, next) {
  if (!(error instanceof Error)) return;
  const code = error instanceof HttpStatus ? error.code : 500;
  let data = {};
  const message = "asJson" in error && error.asJson ? JSON.parse(error.message) : error.message;
  res.status(code);
  data.status = code;
  if (code >= 100 && code < 300) data = message;
  if (code >= 300 && code < 400) res.header("Location", message);
  if (code >= 400 && code < 500) data = message;
  if (code >= 500 && code < 600)
    console.error(error.stack.split("\n").slice(0, 5).join("\n").replaceAll(process.cwd(), ""));
  console.log(process.cwd());
  res.json(data);
}

module.exports = { HttpStatus, sendStatus, statusMW };
