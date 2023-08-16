function getRandomAdURL(ads){
    if(ads === undefined || ads === null) return
    const allAdsURLs = Object.values(ads).flat(); // One array ['https://example.com/example.png', "https://example.com/example.jpg"]
    const randomIndex = Math.floor(Math.random() * allAdsURLs.length); 
    return allAdsURLs[randomIndex];
}


function filterAdsByType(filteredAds, type){
    const allowedTypes = ["wide skyscraper", "leaderboard", "large rectangle", "medium rectangle", "mobile banner"];
    if(type === undefined || !allowedTypes.includes(type)) {
        throw new Error("Unsupported type");   
    }
  
    const adType = filteredAds.map(item => item.images[type] !== undefined ? item.images[type] : null)
            .filter(value => value !== null);
    
    return getRandomAdURL(adType)      
}

module.exports = {
    filterAdsByType,
};
