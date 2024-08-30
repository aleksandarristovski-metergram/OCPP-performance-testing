export const SOAK_TEST_OPTIONS = {
    scenarios: {
        soak_test: {
            executor: 'constant-vus',
            vus: 15,
            duration: '5m'
        }
    },
    thresholds: {
        'ws_connecting': ['avg < 300', 'p(95) < 500'],
        'message_response_time': ['avg < 600', 'p(95) < 1000'],
        checks: ['rate > 0.95'],
    }
}