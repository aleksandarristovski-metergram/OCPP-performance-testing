export const SPIKE_TEST_OPTIONS = {
    scenarios: {
        spike_test: {
            executor: 'ramping-vus',
            stages: [
                { duration: '20s', target: 10 },
                { duration: '20s', target: 30 },
                { duration: '1m', target: 5 }
            ]
        }
    },
    thresholds: {
        'ws_connecting': ['avg < 400', 'p(95) < 700'],
        'message_response_time': ['avg < 700', 'p(95) < 1200'],
        checks: ['rate > 0.90'],
    }
}
