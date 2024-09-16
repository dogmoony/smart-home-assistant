class Event {
    constructor(eventType, deviceID) {
        this.eventType = eventType;
        this.deviceID = deviceID;
        this.timestamp = Date.now();
    }
}

class Publisher extends Event {
    constructor(eventType, deviceID, sensorType, value, unit) {
        super(eventType, deviceID, this.timeStamp);
        this.sensorType = sensorType;
        this.value = value;
        this.unit = unit;
    }
}

class Subscriber extends Event {
    constructor(eventType, deviceID, status) {
        super(eventType, deviceID, this.timeStamp);
        this.status = status;
    }
}