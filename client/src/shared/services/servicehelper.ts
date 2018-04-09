export function status<T>(response: Response): T {
  if (response.status >= 200 && response.status < 400) {
    return response.json() as any;
  }

  throw response;
}

export function parseError(error: any): any {
  if (error instanceof Error) {
    return error;
  }
  if (error instanceof Response) {
    return new Error(error.statusText);
  }
  if (typeof error.json === "function") {
    return new Promise<any>((_resolve, reject) => reject(error.json()));
  }

  return new Promise<any>((_resolve, reject) => reject(error));
}
