export class WsMessage {
}
export class ChatMessage extends WsMessage {
    constructor(text) {
        super();
        this.text = text;
        this.type = "chat";
    }
}
/*
export class PongMessage extends WsMessage {
    type = "pong";
    constructor(public text: string) {
        super();
    }
}
*/
