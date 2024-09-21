const EventBus = require("./eventBus.js"); // For CommonJS

// Jest unit tests for the EventBus class
describe("EventBus", () => {
  let eventBus;

  // Set up a new EventBus instance before each test
  beforeEach(() => {
    eventBus = new EventBus();
  });

  test("should call subscriber when event is published", () => {
    // Create a mock subscriber function
    const mockSubscriber = jest.fn();

    // Subscribe the mock subscriber to an event type
    eventBus.subscribe("TestEvent", mockSubscriber);

    // Publish the event
    eventBus.publish("TestEvent", { key: "value" });

    // Assert that the subscriber was called once with the correct event data
    expect(mockSubscriber).toHaveBeenCalledTimes(1);
    expect(mockSubscriber).toHaveBeenCalledWith("TestEvent", { key: "value" });
  });

  test("should call multiple subscribers when event is published", () => {
    // Create two mock subscriber functions
    const mockSubscriber1 = jest.fn();
    const mockSubscriber2 = jest.fn();

    // Subscribe both subscribers to the same event type
    eventBus.subscribe("TestEvent", mockSubscriber1);
    eventBus.subscribe("TestEvent", mockSubscriber2);

    // Publish the event
    eventBus.publish("TestEvent", { data: 123 });

    // Assert that both subscribers were called with the correct data
    expect(mockSubscriber1).toHaveBeenCalledWith("TestEvent", { data: 123 });
    expect(mockSubscriber2).toHaveBeenCalledWith("TestEvent", { data: 123 });
  });

  test("should handle publishing event with no subscribers gracefully", () => {
    // Attempt to publish an event with no subscribers
    // Ensure it does not throw any errors
    expect(() => {
      eventBus.publish("NoSubscribersEvent", { info: "test" });
    }).not.toThrow();
  });

  test("should handle errors in subscriber callbacks without affecting others", () => {
    // Create a faulty subscriber that throws an error
    const faultySubscriber = jest.fn(() => {
      throw new Error("Subscriber error");
    });
    const mockSubscriber = jest.fn();

    // Subscribe both the faulty and normal subscriber to the same event
    eventBus.subscribe("ErrorEvent", faultySubscriber);
    eventBus.subscribe("ErrorEvent", mockSubscriber);

    // Publish the event
    eventBus.publish("ErrorEvent", { test: "data" });

    // Assert that the mock subscriber still receives the event despite the error
    expect(mockSubscriber).toHaveBeenCalledWith("ErrorEvent", { test: "data" });
  });

  test("should not call subscriber for unrelated events", () => {
    // Create a mock subscriber function
    const mockSubscriber = jest.fn();

    // Subscribe to a different event type
    eventBus.subscribe("AnotherEvent", mockSubscriber);

    // Publish an unrelated event
    eventBus.publish("UnrelatedEvent", { key: "value" });

    // Assert that the subscriber was not called
    expect(mockSubscriber).not.toHaveBeenCalled();
  });
});
