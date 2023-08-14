/**
 * @jest-environment jsdom
 */

const { getRandomAdURL } = require('../script.js')

const inputValue = ['https://example.com/smth1.png', 
                    "https://example.com/value2.jpg",
                    "https://example.com/valueThree.jpeg"]

const randomAd = getRandomAdURL(inputValue)

test('propely generate random Ad Url function', () => {
    expect(inputValue).toContain(randomAd);
})