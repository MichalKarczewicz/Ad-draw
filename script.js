// Array to store the data from json file 
let data = [];

// Function to get data from json file
async function getAdsList(){
  try{
    const response = await fetch('payload.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
  }catch(error){
    console.error('Loading error', error);
  }
}

const getCurrentDomain = (banners) => {
  const currentDomain = window.location.hostname;
  return currentDomain;
}

// Function to check the current domain and filter data
const filterAdsByDomain = (banners, currentDomain) => {
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

const filterBannerByType = (filteredAds, type) => {
  if(type === undefined){
    return getRandomAdURL(filteredAds.map(item => Object.values(item.images)));
  }else{
    const imagesType = filteredAds.map(item => item.images[type])
    .filter(value => value !== undefined)
    .map(value => `${value}`);
    return getRandomAdURL(imagesType)
  }
}

/*
  Single ad randomization function
*/
const getRandomAd = (data, type) =>{
    const { banners } = data;
    const filteredAds = filterAdsByDomain(banners, getCurrentDomain(banners));
    const randomAd = filterBannerByType(filteredAds, type);

    console.log("losowa reklama:", randomAd)
    return randomAd 
}

async function main(){
  await getAdsList();
  getRandomAd(data);
  getRandomAd(data, "mobile banner");
}

window.onload = () => {
    main();
};

// podejscie ze uzytkownik wprowadza ze chce reklame wylosowac typu 
// "wide_skyscraper" i losuje z wszystkich dostepnych wide_skyscraperow
