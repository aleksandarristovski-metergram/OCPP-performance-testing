# k6 WebSocket Performance Tests

This repository contains performance tests for OCPP CPMS using k6 Websocket connections. The tests cover various scenarios, including below average load, increasing load, soak test, spike test, and stress test.

## Setup

1. **Install k6**:
   Follow the installation instructions from the [k6 documentation](https://grafana.com/docs/k6/latest/set-up/install-k6/).

2. **Project Dependencies**:
   No additional dependencies are needed.

3. **Configuration**:
   - **`config/config.js`**: Contains base URL and parameters for WebSocket connections.
   - **`data/test_data.json`**: Contains the test data to be used by the WebSocket client.

## Running Tests

1. **Select a Test Scenario**:
   To run a specific test scenario, uncomment the corresponding `options` export statement in the `test.js` file and comment out the others. The following options are available:

   - **Below Average Load**: Tests the system with a light load.
     ```javascript
     export const options = BELOW_AVERAGE_LOAD_OPTIONS;
     ```

   - **Increasing Load**: Gradually increases the load on the system.
     ```javascript
     export const options = INCREASING_LOAD_OPTIONS;
     ```

   - **Soak Test**: Tests the system's stability under a constant load for an extended period.
     ```javascript
     export const options = SOAK_TEST_OPTIONS;
     ```

   - **Spike Test**: Evaluates how the system handles sudden spikes and drops in load.
     ```javascript
     export const options = SPIKE_TEST_OPTIONS;
     ```

   - **Stress Test**: Pushes the system to its limits to observe its behavior under extreme conditions.
     ```javascript
     export const options = STRESS_TEST_OPTIONS;
     ```

2. **Run the Test**:
   Use the k6 CLI to execute the test script. For example:
   ```bash
   k6 run path/to/mainTest.js
   ```

## Metrics and Thresholds
Each test scenario has specific metrics and thresholds defined. You can monitor these metrics using the k6 output, and they include:

- **WebSocket Connecting Time (\`ws_connecting\`):**
    - **\`avg\`** and **\`p(95)\`** thresholds vary by scenario.

- **Message Response Time (\`message_response_time\`):**
    - **\`avg\`** and **\`p(95)\`** thresholds vary by scenario.

- **Check Rate (\`checks\`):**
    - Minimum acceptable rate varies by scenario.

## Custom Metrics
- **\`message_response_time\`**: Measures the time taken for a message response from the WebSocket server.

## Notes
- Adjust the parameters and test data as needed to fit your specific use case.
- For further details on each test, refer to the specific configurations in the test.js file.

For more information about k6 and its capabilities, visit the [k6 Documentation](https://grafana.com/docs/k6/latest/).