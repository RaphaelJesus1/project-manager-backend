export class MissingParamsError extends Error {
  constructor() {
    super(`Missing params`);
    this.name = "MissingParamsError";
  }
}
