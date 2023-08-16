function getRandomAdURL(ads){
    if(ads === undefined || ads === null) return
    const allAdsURLs = Object.values(ads).flat(); // One array ['https://example.com/example.png', "https://example.com/example.jpg"]
    const randomIndex = Math.floor(Math.random() * allAdsURLs.length); 
    return allAdsURLs[randomIndex];
}

module.exports = {
    getRandomAdURL,
};