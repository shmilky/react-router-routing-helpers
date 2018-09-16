'use strict';

import reactRouterRoutingHelpers from '../index';
const {parseQueryString, objToQueryParams} = reactRouterRoutingHelpers;

describe('react-router-routing-helpers tests', () => {
    test('Dummy test to see that the test starts to run', (done) => {
        expect("test test").toEqual("test test");
        done();
    });

    describe('parse query string', () => {

        test('basic', (done) => {
            expect(parseQueryString('')).toEqual({});
            expect(parseQueryString('?a=2&b=3')).toEqual({a: '2', b: '3'});
            expect(parseQueryString('?a=2&b=3')).not.toEqual({a: '444444', b: '3'});

            done();
        });

        test('url params', (done) => {
            expect(parseQueryString('a=%2F12345')).toEqual({a: '/12345'});

            done();
        });

        test('end cases', (done) => {
            expect(parseQueryString(null)).toEqual({});
            expect(parseQueryString(undefined)).toEqual({});
            expect(parseQueryString('a=1-1-1')).toEqual({a: '1-1-1'});
            expect(parseQueryString({})).toEqual({});

            done();
        });
    });

    describe('object to query string', () => {

        test('basic', (done) => {
            expect(objToQueryParams({})).toEqual('');
            expect(objToQueryParams({a: '2', b: '3'})).toEqual('a=2&b=3');
            expect(objToQueryParams({a: '444444', b: '3'})).not.toEqual('a=2&b=3');

            done();
        });

        test('url params', (done) => {
            expect(objToQueryParams({a: '/12345'})).toEqual('a=%2F12345');

            done();
        });

        test('end cases', (done) => {
            expect(objToQueryParams(null)).toEqual('');
            expect(objToQueryParams(undefined)).toEqual('');
            expect(objToQueryParams({a: '1-1-1'})).toEqual('a=1-1-1');

            done();
        });
    });

});


