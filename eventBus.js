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
    this.eventBus = eventBus; // The EventBus instance for communication
  }

  publishEvent(eventType, deviceID, data) {
    const event = new Event(eventType, deviceID, data); // Create a new event
    this.eventBus.publish(event); // Publish event to the Event Bus
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

class EventBus {
  constructor() {
    // Map to hold subscribers for each event type
    this.subscribers = new Map();
  }

  // Method to register a subscriber callback for a specific event type
  subscribe(eventType, callback) {
    // Initialize the list of subscribers if the event type does not exist
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    // Add the callback function to the subscribers list
    this.subscribers.get(eventType).push(callback);
  }

  // Method to publish an event of a specific type with associated data
  publish(eventType, data) {
    // Check if there are subscribers for this event type
    if (this.subscribers.has(eventType)) {
      // Broadcast the event to all registered subscribers
      this._broadcast(eventType, data);
    } else {
      console.log(`No subscribers for event type: ${eventType}`);
    }
  }

  _broadcast(eventType, data) {
    // Loop through all subscribers of the event type
    this.subscribers.get(eventType).forEach((callback) => {
      try {
        // Call the subscriber's callback function with the event data
        callback(eventType, data);
      } catch (error) {
        // Log error and continue with other subscribers
        console.error(`Error broadcasting to subscriber: ${error}`);
      }
    });
  }
}

// Example of usage:

// Define sample subscriber functions
function thermostatListener(eventType, data) {
  console.log(`[Thermostat] Received event '${eventType}' with data:`, data);
}

function lightingListener(eventType, data) {
  console.log(`[Lighting] Received event '${eventType}' with data:`, data);
}

// Create an EventBus instance
const eventBus = new EventBus();

// Register subscribers
eventBus.subscribe("TemperatureChanged", thermostatListener);
eventBus.subscribe("MotionDetected", lightingListener);

// Publish events
eventBus.publish("TemperatureChanged", { temperature: 22 });
eventBus.publish("MotionDetected", { location: "Living Room" });

// Example of publishing an event with no subscribers
eventBus.publish("DoorOpened", { door: "Front Door" });

module.exports = EventBus;
