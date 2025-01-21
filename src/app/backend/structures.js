export class Message {
    constructor(sender, message) {
        this.sender = sender;
        this.message = message;
        this.time = Date.now()
        this.corrections = []
    }
}