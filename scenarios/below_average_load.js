export const BELOW_AVERAGE_LOAD_OPTIONS = {
    scenarios: {
        below_average_load: {
            executor: 'shared-iterations',
            vus: 3,
            iterations: 9
        }
    },
    thresholds: {
        'ws_connecting': ['avg < 200', 'p(95) < 300'],
        'message_response_time': ['avg < 300', 'p(95) < 500'],
        checks: ['rate > 0.98'],
    }
}