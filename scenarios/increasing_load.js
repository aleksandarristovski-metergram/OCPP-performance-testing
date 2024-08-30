export const INCREASING_LOAD_OPTIONS = {
    scenarios: {
        increasing_load: {
            executor: 'ramping-vus',
            stages: [
                { duration: '30s', target: 10 },
                { duration: '1m', target: 20 },
                { duration: '1m', target: 0 }
            ]
        }
    },
    thresholds: {
        'ws_connecting': ['avg < 350', 'p(95) < 600'],
        'message_response_time': ['avg < 500', 'p(95) < 1000'],
        checks: ['rate > 0.90'],
    }
}