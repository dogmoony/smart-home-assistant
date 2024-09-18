class Event {
    constructor(eventType, deviceID, data) {
        this.eventType = eventType;
        this.deviceID = deviceID;
        this.data = data;
        this.timestamp = Date.now();
    }
}

class Publisher {
    constructor(eventBus) {
        this.eventBus = eventBus;  // The EventBus instance for communication
    }

    publishEvent(eventType, deviceID, data) {
        const event = new Event(eventType, deviceID, data);  // Create a new event
        this.eventBus.publish(event);  // Publish event to the Event Bus
    }
}

class Subscriber {
    constructor(eventBus, eventType, handler) {
        this.eventBus = eventBus;
        this.eventType = eventType;
        this.handler = handler;

        // Subscribe to the event type when the class is instantiated
        this.eventBus.subscribe(eventType, handler);
    }
}

// The EventBus Class - Manages publishing and subscribing to events
class EventBus {
    constructor() {
        this.subscribers = {};  // Store subscribers by event type
    }

    // Subscribe a handler to a specific event type
    subscribe(eventType, handler) {
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        this.subscribers[eventType].push(handler);
    }

    // Publish an event to all relevant subscribers
    publish(event) {
        const eventType = event.eventType;
        const handlers = this.subscribers[eventType];
        if (handlers) {
            handlers.forEach(handler => handler(event));
        }
    }
}

// Example usage:

// Initialize the Event Bus
const eventBus = new EventBus();

// Create a Publisher
const publisher = new Publisher(eventBus);

// Create a Subscriber for temperature events
const temperatureSubscriber = new Subscriber(eventBus, 'temperatureChange', (event) => {
    console.log(`Temperature event received from Device ${event.deviceID}:`, event.data);
});

// Create a Subscriber for motion detection events
const motionSubscriber = new Subscriber(eventBus, 'motionDetected', (event) => {
    console.log(`Motion detected from Device ${event.deviceID}:`, event.data);
});

// Publisher publishes a temperature event
publisher.publishEvent('temperatureChange', 'device123', { temperature: 22.5 });

// Publisher publishes a motion detected event
publisher.publishEvent('motionDetected', 'device456', { motionDetected: true });

