// Array to store the data from json file 
let data = [];
// Name of advertisement class 
let adClass = "ad";


//
window.onload = () => {
  main();
};


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

// Function to return single advertisement 
// input: [Array(3), Array(3)] or ['https://example.com/example.png', "https://example.com/example.jpg"]
// output: https://example.com/example.png
const getRandomAdURL = (ads) => {
  const allAdsURLs = Object.values(ads).flat(); // One array ['https://example.com/example.png', "https://example.com/example.jpg"]
  const randomIndex = Math.floor(Math.random() * allAdsURLs.length); 
  return allAdsURLs[randomIndex];
}

// Function to return ads by type
// For example, only mobile banners
// If type is undefined, then the function will randomize after all ads
const filterAdsByType = (filteredAds, type) => {
  
  if(type !== undefined){
    const adType = filteredAds.map(item => item.images[type])
    .filter(value => value !== undefined)
    return getRandomAdURL(adType)
  }
  
  return getRandomAdURL(filteredAds.map(item => Object.values(item.images)));
}


const getRandomAd = (data, type) =>{
    const { banners } = data;
    const filteredAds = filterAdsByDomain(banners, getCurrentDomain());
    const randomAd = filterAdsByType(filteredAds, type);
   
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
  imgElement.setAttribute('alt', "Advertisement");

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

async function main(){
  await getAdsList();
  
  getRandomAd(data);
  getRandomAd(data, "wide skyscraper");

  setAdvertisement(getRandomAd(data, "leaderboard"));
}
