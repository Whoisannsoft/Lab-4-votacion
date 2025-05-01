type ActionCallback = (action: any) => void;

class Dispatcher {
  private callbacks: ActionCallback[] = [];

  register(callback: ActionCallback) {
    this.callbacks.push(callback);
  }

  dispatch(action: any) {
    this.callbacks.forEach((cb) => cb(action));
  }
}

export const dispatcher = new Dispatcher();
