type Message = Uint8Array;
type LocalWebsocketServer = {
    on: (messageType: "message", handler: (message: Message) => void) => void;
    send: (message: Message) => void;
};
declare function intercept(host: string): LocalWebsocketServer;

export { intercept };
