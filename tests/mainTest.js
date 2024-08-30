import ws from 'k6/ws';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

import { BASE_URL, PARAMS } from '../config/config.js';
import { BELOW_AVERAGE_LOAD_OPTIONS } from '../scenarios/below_average_load.js';
import { INCREASING_LOAD_OPTIONS } from '../scenarios/increasing_load.js';
import { SOAK_TEST_OPTIONS } from '../scenarios/soak_test.js'
import { STRESS_TEST_OPTIONS } from '../scenarios/stress_test.js'
import { SPIKE_TEST_OPTIONS } from '../scenarios/spike_test.js'
import {  createMessage, addTrsId} from '../utils/dataUtils.js'


import { chai } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';
import { initContractPlugin } from 'https://jslib.k6.io/k6chaijs-contracts/4.3.4.0/index.js';

initContractPlugin(chai)

let messageResponseTime = new Trend('message_response_time');

export const options = BELOW_AVERAGE_LOAD_OPTIONS;
// export const options = INCREASING_LOAD_OPTIONS;
// export const options = SOAK_TEST_OPTIONS;
// export const options = STRESS_TEST_OPTIONS;
// export const options = SPIKE_TEST_OPTIONS;

const testData = JSON.parse(open('../data/test_data.json'))

export default function() {
    const url = `${BASE_URL}/OCPP${__VU}`;
    const params = PARAMS;

    const response = ws.connect(url, params, function (socket) {
        let messageIndex = 0;
        let flowMessages = testData["flow"]
        let ID = -1;
        let startTime;

        function sendMessage(){
            if (messageIndex < flowMessages.length) {
                const message = flowMessages[messageIndex]

                const checkMeterValues = JSON.parse(message);
                if(checkMeterValues[2] == "MeterValues"){
                    sleep(2)
                }

                let toSend = createMessage(message);
                
                if (ID != -1){
                    toSend = addTrsId(toSend, ID);
                }
                socket.send(toSend);
                startTime = Date.now();

                messageIndex++;
                console.log(`OCPP${__VU}: ${toSend}`);
            }
            else socket.close()
        };


        socket.on('open', function () {
            console.log(`Connected on: ${url}`);

            sendMessage();
        });


        socket.on('message', function (msg) {

            console.log(`CSMS to CP OCPP${__VU}: ${msg}`);
            const msgJson = JSON.parse(msg);
            const trsID = msgJson[2].transactionId;
            
            if(trsID != null){
                ID = trsID
            }

            let duration = Date.now() - startTime;
            messageResponseTime.add(duration);
            
            sleep(1)
            sendMessage()
        });


        socket.on('close', function () {
            console.log('Disconnected');
        });

        socket.on('error', function (e) {
            console.log('An error occurred: ' + e.error());
        });
    });
};
