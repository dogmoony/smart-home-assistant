class Event {
    constructor(eventType, deviceID) {
        this.eventType = eventType;
        this.deviceID = deviceID;
        this.timestamp = Date.now();
    }
}