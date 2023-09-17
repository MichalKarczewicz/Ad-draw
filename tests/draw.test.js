
 /**
 * @jest-environment jsdom
 */

const AdDrawer = require('../AdDrawer');
const { mockProperty } = require('jest-mock');
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


describe('AdDrawer', () => {
   test('The constructor accepts the passed configuration', () => {
      const customConfig = 'config.json';
      const adDrawer = new AdDrawer(customConfig);
      expect(adDrawer.configuration).toBe(customConfig);
      expect(adDrawer.ads).toEqual([]);
      expect(adDrawer.type).toBeNull();
    });

   test('The constructor sets default properties', () => {
      const adDrawer = new AdDrawer();
      expect(adDrawer.configuration).toBe('./payload.json');
      expect(adDrawer.ads).toEqual([]);
      expect(adDrawer.type).toBeNull();
    });


    test('getCurrentDomain should return the current domain', () => {
      const adDrawer = new AdDrawer();
      const originalWindow = global.window;
      global.window = Object.create(originalWindow);

      Object.defineProperty(global.window, 'location', {
          value: {
              hostname: 'przeksztalcenia.pl'
          }
      });
   
      const result = adDrawer.getCurrentDomain();
      expect(result).toBe('przeksztalcenia.pl');
   });

  test('filterAdsByDomain filtering ads by domain', () => {
    const adDrawer = new AdDrawer();
    const { banners } = data

    const filteredAds = adDrawer.filterAdsByDomain(banners, 'https://przeksztalcenia.pro/');
    expect(filteredAds[0].link).toBe('https://przeksztalcenia.pro/');
  });

  
  test('Function filterAdsByType It should return a random ad with "mobile banner" type', () => {
   const adDrawer = new AdDrawer();
   const { banners } = data;
   const images = ['https://images.bezproblemow.pl/mobile-cokolwiek.jpg','https://majkesz.pl/grafika.jpg','https://pixabay.com/tree.jpg']
  
   const filteredAds = adDrawer.filterAdsByType(banners, 'mobile banner');

   expect(adDrawer.type).toBe('mobile banner');
   expect(images).toContain(filteredAds);
 });

 test('Function filterAdsByType It should return undefined for a non-existent type', () => {
   const adDrawer = new AdDrawer();
   const { banners } = data;

   const filteredAds = adDrawer.filterAdsByType(banners);

   expect(filteredAds).toBeUndefined();
   expect(adDrawer.type).toBeNull();
 });

 test('Function filterAdsByType It should return undefined for an empty ad list', () => {
   const adDrawer = new AdDrawer();
   const banners = [];
   const filteredAds = adDrawer.filterAdsByType(banners, 'large rectangle');
   expect(filteredAds).toBeUndefined();
   expect(adDrawer.type).toBeNull();
 });
   
  test('getRandomAdURL wybiera losową reklamę', () => {
    const adDrawer = new AdDrawer();
    const ads = ['https://example.com/a.png', 'https://example.com/b.png', 'https://example.com/c.png'];
    const randomAd = adDrawer.getRandomAdURL(ads);
    expect(ads.includes(randomAd)).toBe(true);
  });

  
  
  

  test('draw wykonuje zapytanie i ustawia właściwości', async () => {
    const adDrawer = new AdDrawer('https://example.com/api');
    const type = 'large rectangle';
    const id = 'ad-container';
    const ad = 'https://przeksztalcenia.pro/large-cokolwiek.webp';

    // Mockowanie funkcji fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    );

    const result = await adDrawer.draw(type, id);

    expect(result).toBe(ad);
 
  });
});
