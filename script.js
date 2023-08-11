// True to prepare advertisement img 
const addAdvertisement = true;
// Name of ad class 
const adClass = "ad";
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

const getCurrentDomain = () => {
  return window.location.hostname;
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
  
  if(type !== undefined){
    const adType = filteredAds.map(item => item.images[type])
    .filter(value => value !== undefined)
    return getRandomAdURL(adType)
  }
    
  return getRandomAdURL(filteredAds.map(item => Object.values(item.images)));
}

/*
  Single ad randomization function
*/
const getRandomAd = (data, type) =>{
    const { banners } = data;
    const filteredAds = filterAdsByDomain(banners, getCurrentDomain());
    const randomAd = filterBannerByType(filteredAds, type);
    
    return randomAd 
}

const setAdvertisement = (advertisement) => {
  const foundItem = data.banners.find(ad =>
    Object.values(ad.images).includes(advertisement)
  );
  const configuration = foundItem ? foundItem.configuration : null;
  const tags = foundItem ? foundItem.tags : null;

  const imgContainer = document.querySelector(`.${adClass}`);
  const imgElement = document.createElement('img');
  imgElement.src = advertisement;

  if (configuration.rel) {
    imgElement.setAttribute('rel', configuration.rel.join(' '));
  }
  if (configuration.target) {
    imgElement.setAttribute('target', configuration.target);
  }
  if(tags){
    imgElement.setAttribute('data-tags', tags.join(' '));
  }
  
  imgContainer.appendChild(imgElement);
}

// Main

async function main(){
  await getAdsList();

  getRandomAd(data);
  getRandomAd(data, "wide skyscraper");
  setAdvertisement(getRandomAd(data, "leaderboard"));
}

window.onload = () => {
    main();
};
