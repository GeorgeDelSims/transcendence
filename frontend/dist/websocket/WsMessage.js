export class WsMessage {
    toJSON() {
        return JSON.stringify(this);
    }
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
