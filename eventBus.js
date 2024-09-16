class Event {
    constructor(eventType, deviceID, data) {
        this.eventType = eventType;
        this.deviceID = deviceID;
        this.data = data;
        this.timestamp = Date.now();
    }
}

class Publisher extends Event {
    constructor(eventType, deviceID, data) {
        super(eventType, deviceID, data, this.timeStamp);
    }
}

class Subscriber extends Event {
    constructor(eventType, deviceID, data) {
        super(eventType, deviceID, data, this.timeStamp);
    }
}