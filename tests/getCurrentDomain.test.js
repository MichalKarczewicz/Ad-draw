/**
 * @jest-environment jsdom
 */

const { getCurrentDomain } = require('./getCurrentDomain.js')

test('propely get current domain name', () => {
    const result = getCurrentDomain();

    const expectedDomain = window.location.hostname;
    expect(result).toEqual(expectedDomain);
})

