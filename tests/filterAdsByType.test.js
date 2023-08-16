/**
 * @jest-environment jsdom
 */

const { filterAdsByType } = require('./filterAdsByType.js')

const inputValue = [
       {
          "link":"https://przeksztalcenia.pro/",
          "images":{
             "wide skyscraper":"https://przeksztalcenia.pro/wide-cokolwiek.png",
             "leaderboard":"https://przeksztalcenia.pro/leader-cokolwiek2.png",
             "large rectangle":"https://przeksztalcenia.pro/large-cokolwiek.webp"
          },
          "configuration":{
             "rel":[
                "nofollow",
                "noindex"
             ],
             "target":"_blank"
             
          },
          "tags":[
             "law",
             "company"
          ]
       }
]



test('propely filter ads by type', () => {
    const type = 'leaderboard'
    const value = filterAdsByType(inputValue, type)

    expect(value).toContain(value);
})
