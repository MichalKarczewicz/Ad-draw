
 /**
 * @jest-environment jsdom
 */

const AdDrawer = require('../AdDrawer');
data = {
   "banners":[
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
      },
      {
         "link":"https://bezproblemow.pl/",
         "images":{
            "wide skyscraper":"https://pixabay.com/wide-cokolwiek.png",
            "mobile banner":"https://images.bezproblemow.pl/mobile-cokolwiek.jpg",
            "leaderboard":"https://pixabay.com/leader-cokolwiek.jpg"
         },
         "configuration":{
            "rel":[
               "opener"
            ],
            "target":"_blank"
         },
         "tags":[
            "law",
            "company",
            "property",
            "real estate"
         ]
      },
      {
         "link":"https://majkesz.pl/",
         "images":{
            "mobile banner":"https://majkesz.pl/grafika.jpg",
            "leaderboard": "https://majkesz.pl/leader-grafika.png",
            "wide skyscraper" : "https://media.istockphoto.com/id/1406114828/pl/zdj%C4%99cie/budynek-wie%C5%BCowca-mieszkanie-wie%C5%BCe-biurowe.jpg?s=2048x2048&w=is&k=20&c=0MpL9pJJHSTbXl5on5wMjHM0vwYNfV0pMYHtprDwOl0="

         },
         "configuration":{
            "rel":[
               "opener"
            ],
            "target":"_self"
         }
      },
      {
         "link":"http://127.0.0.1:5500",
         "images":{
            "mobile banner":"https://pixabay.com/tree.jpg"
         }
      }
   ]
}
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
);



 
 describe("AdDrawer", () => {
   const adDrawer = new AdDrawer(data);
 
   test("Draw is defined and called with arguments", async () => {
     const setDrawSpy = jest.spyOn(adDrawer, "draw");
     const setGetRandomAdSpy = jest.spyOn(adDrawer, "draw");
 
     const result = await adDrawer.draw("wide skyscraper", "ad");
     expect(result).toBeDefined();
     expect(setDrawSpy).toHaveBeenCalledWith("wide skyscraper", "ad");
   });
 
   afterEach(() => {
     jest.restoreAllMocks();
   })
 });