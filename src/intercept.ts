import MockWebSocket from "./websocket";

type Message = Uint8Array;
const NativeWebSocket = window.WebSocket;

type MessageListener = (message: Message) => void;

type Receive = (message: Message) => void;

const interceptedHosts = new Map<string, Set<MessageListener>>();
const messageReceiver = new Map<string, Receive>();

const WebsocketProxy = new Proxy(NativeWebSocket, {
  construct(target, args: [string]) {
    console.log("WebSocketProxy constructed with args:", args);
    console.log("intercepted hosts", interceptedHosts);
    const url = args[0];
    const host = new URL(url).host;
    const instance = interceptedHosts.has(host) ? new MockWebSocket(url) : new target(...args);

    messageReceiver.set(host, (message: Message) => {
      const messageEvent = new MessageEvent("message", {
        data: message,
        origin: url,
      }) as any;
      instance.dispatchEvent(messageEvent);
    });

    const proxy = new Proxy(instance, {
      get(obj: any, prop) {
        const value = obj[prop];
        if (typeof value === "function") {
          return function (...args: any[]) {
            const listeners = interceptedHosts.get(host);
            if (listeners && prop === "send") {
              for (const listener of listeners) {
                listener(args[0]);
                return;
              }
            }
            return value.apply(obj, args);
          };
        }
        return value;
      },
      set(obj, prop, value) {
        obj[prop] = value;
        return true;
      },
    });

    return proxy;
  },
});

type LocalWebsocketServer = {
  on: (messageType: "message", handler: (message: Message) => void) => void;
  send: (message: Message) => void;
};

function intercept(host: string): LocalWebsocketServer {
  window.WebSocket = WebsocketProxy;
  interceptedHosts.set(host, new Set());
  return {
    on: (messageType, listener) => {
      if (messageType === "message") {
        const listeners = interceptedHosts.get(host);
        listeners?.add(listener);
      }
    },
    send: (message) => {
      const receiver = messageReceiver.get(host);
      if (receiver) receiver(message);
    },
  };
}

export { intercept };
