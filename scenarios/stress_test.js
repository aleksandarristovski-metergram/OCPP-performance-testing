export const STRESS_TEST_OPTIONS = {
    scenarios: {
        stress_test: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 100
        }
    },
    thresholds: {
        'ws_connecting': ['avg < 500', 'p(95) < 800'],
        'message_response_time': ['avg < 800', 'p(95) < 1500'],
        checks: ['rate > 0.85'],
    }
}