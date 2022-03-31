// Copyright 2020 Vonage
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as api from "../lib/applications"
import * as types from '../lib/types';
import nock from 'nock';

const config: types.ApplicationsClassParameters = {}
const BASE_URL = "https://api.nexmo.com/v2/applications".replace(/\/+$/, "");

let applicationBody: types.Application = {
    "name": "Demo Application",
    "keys": {
        "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCA\nKOxjsU4pf/sMFi9N0jqcSLcjxu33G\nd/vynKnlw9SENi+UZR44GdjGdmfm1\ntL1eA7IBh2HNnkYXnAwYzKJoa4eO3\n0kYWekeIZawIwe/g9faFgkev+1xsO\nOUNhPx2LhuLmgwWSRS4L5W851Xe3f\nUQIDAQAB\n-----END PUBLIC KEY-----\n"
    },
    "capabilities": {
        "voice": {
            "webhooks": {
                "answer_url": {
                    "address": "https://example.com/webhooks/answer",
                    "http_method": "GET",
                    "connection_timeout": 500,
                    "socket_timeout": 3000
                },
                "fallback_answer_url": {
                    "address": "https://fallback.example.com/webhooks/answer",
                    "http_method": "GET",
                    "connection_timeout": 500,
                    "socket_timeout": 3000
                },
                "event_url": {
                    "address": "https://example.com/webhooks/event",
                    "http_method": "POST",
                    "connection_timeout": 500,
                    "socket_timeout": 3000
                }
            }
        },
        "rtc": {
            "webhooks": {
                "event_url": {
                    "address": "https://example.com/webhooks/event",
                    "http_method": "POST"
                }
            }
        },
        "messages": {
            "webhooks": {
                "inbound_url": {
                    "address": "https://example.com/webhooks/inbound",
                    "http_method": "POST"
                },
                "status_url": {
                    "address": "https://example.com/webhooks/status",
                    "http_method": "POST"
                }
            }
        }
    },
    "privacy": {
        "improve_ai": true
    }
}
describe("DefaultApi", () => {
    let instance: api.DefaultApi
    beforeEach(function () {
        instance = new api.DefaultApi(config)
    });

    test("createApplication", () => {


        nock(BASE_URL)
            .post(`/`, { apiKey: "12345", apiSecret: "ABCDE", country: "US", msisdn: "12345", targetApiKey: "67890" })
            .reply(200);


        return expect(instance.createApplication(body, {})).resolves.toBe(null)
    })
    test("deleteApplication", () => {
        const id: string = "id_example"
        return expect(instance.deleteApplication(id, {})).resolves.toBe(null)
    })
    test("getApplication", () => {
        const id: string = "id_example"
        return expect(instance.getApplication(id, {})).resolves.toBe(null)
    })
    test("listApplication", () => {
        const pageSize: number = 56
        const page: number = 56
        return expect(instance.listApplication(pageSize, page, {})).resolves.toBe(null)
    })
    test("updateApplication", () => {
        const body: api.IdBody = undefined
        const id: string = "id_example"
        return expect(instance.updateApplication(body, id, {})).resolves.toBe(null)
    })
})


describe("Applications", () => {
    let client: api.Applications
    beforeEach(function () {
        client = new api.Applications({ apiKey: '12345', apiSecret: 'ABCDE' })
    });

    afterEach(function () {
        client = null
    });

    test("buyNumber()", async () => {

        nock(BASE_URL)
            .post(`/number/buy`, { apiKey: "12345", apiSecret: "ABCDE", country: "US", msisdn: "12345", targetApiKey: "67890" })
            .reply(200);

        let results = await client.buyNumber({ country: 'US', msisdn: '12345', targetApiKey: '67890' });
        expect(results.type).toEqual('success');

        nock(BASE_URL)
            .post(`/number/buy`, { apiKey: "12345", apiSecret: "ABCDE", country: "US", msisdn: "12345", targetApiKey: "67890" })
            .reply(400);

        results = await client.buyNumber({ country: 'US', msisdn: '12345', targetApiKey: '67890' });
        expect(results.type).toEqual('error');

    })

    test("getOwnedNumbers()", async () => {

        nock(BASE_URL)
            .get(`/account/numbers`)
            .query({ api_key: '12345', api_secret: 'ABCDE' })
            .reply(200);

        const results = await client.getOwnedNumbers({});
        expect(results.type).toEqual('success');

    })

    test("getAvailableNumbers()", async () => {

        nock(BASE_URL)
            .get(`/number/search`)
            .query({ api_key: '12345', api_secret: 'ABCDE' })
            .reply(200);

        const results = await client.getAvailableNumbers();
        expect(results.type).toEqual('success');

    })

    test("cancelNumber()", async () => {

        nock(BASE_URL)
            .post(`/number/cancel`, { apiKey: "12345", apiSecret: "ABCDE", country: "US", msisdn: "12345", targetApiKey: "67890" })
            .reply(200);

        const results = await client.cancelNumber({ country: 'US', msisdn: '12345', targetApiKey: '67890' });
        expect(results.type).toEqual('success');

    })

    test("updateNumber()", async () => {

        nock(BASE_URL)
            .post(`/number/update`, {
                apiKey: "12345",
                apiSecret: "ABCDE",
                country: "US",
                msisdn: "12345",
                appId: "123abc",
                voiceCallbackType: "app",
                voiceCallbackValue: "https://www.example.com/webhook",
                voiceStatusCallback: "https://www.example.com/webhook/events"
            })
            .reply(200);

        const results = await client.updateNumber({
            country: "US",
            msisdn: "12345",
            appId: "123abc",
            voiceCallbackType: types.VoiceCallbackTypeEnum.App,
            voiceCallbackValue: "https://www.example.com/webhook",
            voiceStatusCallback: "https://www.example.com/webhook/events"
        });
        expect(results.type).toEqual('success');

    })
})

