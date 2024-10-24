export default class ErrorHandling {
  private code: string;
  private message: string;
  private action?: string;

  constructor(code: string, message: string, action?: string) {
    this.code = code;
    this.message = message;
    this.action = action || "";
  }

  returnObjectRequestError() {
    return {
      status: 404,
      message: `The following error happened${this.action ? ` while ${this.action}` : ""} -> Code: ${this.code}; Message: ${this.message}`,
    };
  }

  logErrorToDatabase() {
    // Insert here something to register the errors inside the database, this class can be usefull to do this
  }
}
