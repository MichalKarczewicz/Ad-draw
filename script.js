// leaderboard, large rectangle, medium rectangle, mobile banner, wide skyscraper
// pg, jpeg, png, webp, avif

const getAdsList = () => {
    fetch('payload.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
         getRandomAd(data); 
      })
      .catch(error => {
        console.error('Loading error', error);
      });
  }
  
const filterAdsByDomain = (banners) => {
    const currentDomain = window.location.hostname;

    return banners.filter( ads => {
        let itemDomain = new URL(ads.link).hostname;
        return itemDomain !== currentDomain
    });
}

const getRandomAdURL = (ads) => {
  const allAdsURLs = Object.values(ads).flat();
  const randomIndex = Math.floor(Math.random() * allAdsURLs.length);
  return allAdsURLs[randomIndex];
}

const getRandomAd = (ads) =>{
    const { banners } = ads;
    const filteredAds = filterAdsByDomain(banners);
    const randomAd = getRandomAdURL(filteredAds.map(item => Object.values(item.images)));
    
    return randomAd      
}


window.onload = () => {
    getAdsList()
};

// podejscie ze uzytkownik wprowadza ze chce reklame wylosowac typu 
// "wide_skyscraper" i losuje z wszystkich dostepnych wide_skyscraperow
