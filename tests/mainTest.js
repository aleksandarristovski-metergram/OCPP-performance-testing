import ws from 'k6/ws';
import { check, sleep } from 'k6';
import { BASE_URL, PARAMS } from '../config/config.js';
import exec from 'k6/execution';
import { createTimestamp, generateUniqueId, createMessage} from '../utils/dataUtils.js'

import { chai } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';
import { initContractPlugin } from 'https://jslib.k6.io/k6chaijs-contracts/4.3.4.0/index.js';

initContractPlugin(chai)

export const options = {
    vus: 2,
    iterations: 4,
    // scenarios: {
    //     my_scenario: {
    //         executor: 'shared-iterations',


    //         maxDuration: '10s',
    //     }
    // },
    thresholds: {
        'ws_connecting': ['avg < 300', 'p(95) < 500'],
        checks: ['rate > 0.95'],
    }
}

// export function setup(){}
// export function teardown(){}

const testData = JSON.parse(open('../data/test_data.json'))

export default function() {
    const url = `${BASE_URL}/OCPP${exec.scenario.iterationInTest % 2+1}`;
    const params = PARAMS;

    const response = ws.connect(url, params, function (socket) {
        let messageIndex = 0;
        let messages = testData["flow"]

        function sendMessage(){
            if (messageIndex < messages.length) {
                const message = messages[messageIndex]
                const toSend = createMessage(message);

                socket.send(toSend);
                messageIndex++;
                console.log(`OCPP${exec.scenario.iterationInTest % 2+1}: ${toSend}`);
            }
            else socket.close()
        };

        socket.on('open', function () {
            console.log(`Connected on: ${url}`);

            sendMessage();
        });

        socket.on('message', function (msg) {
            console.log(`CSMS to CP OCPP${exec.scenario.iterationInTest+1}: ${msg}`);
            
            sendMessage()
        });

        socket.on('close', function () {
            console.log('Disconnected');
        });

        socket.on('error', function (e) {
            console.log('An error occurred: ' + e.error());
        });
    });

    check(response, { 'status is 101': (r) => r && r.status === 101 });
};
