export abstract class WsMessage {
    abstract type: string;
}

export class ChatMessage extends WsMessage {
    type = "chat";
    constructor(public text: string) {
        super();
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
