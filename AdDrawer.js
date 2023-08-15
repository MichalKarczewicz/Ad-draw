class AdDrawer{
    constructor(configuration){
       this.configuration = configuration;  
       this.ads = [];
    }

    draw(type, id) {

        const setAd = (ad, id) => {

            const foundItem = this.ads.banners.find(adv =>
                Object.values(adv.images).includes(ad)
            );

            const config = foundItem ? foundItem.configuration : null;
            const tags = foundItem ? foundItem.tags : null;

            const imgContainer = document.querySelector(`#${id}`);

            if(!imgContainer) return 

            const imgElement = document.createElement('img');
            
            imgElement.src = ad;
            imgElement.setAttribute('alt', "Advertisement");
    
            config.rel && imgElement.setAttribute('rel', config.rel.join(' '));
            config.target && imgElement.setAttribute('target', config.target);
            tags && imgElement.setAttribute('data-tags', tags.join(' '));

            
            imgContainer.appendChild(imgElement);
        }
        
        // Function to check the current domain and filter data
        function filterAdsByDomain(banners, currentDomain){
            return banners.filter( ads => {
                let itemDomain = new URL(ads.link).hostname;
                return itemDomain !== currentDomain
            });
        }

        // Function to return ads by type
        // For example, only mobile banners
        // If type is undefined, then the function will randomize after all ads
        // Example input: [{..}. {..}, {..}] - 
        // {link: 'https://przeksztalcenia.pro/', images: {…}, configuration: {…}, tags: Array(2)}
        // output: https://majkesz.pl/leader-grafika.png
        function filterAdsByType(filteredAds, type){
            const allowedTypes = ["wide skyscraper", "leaderboard", "large rectangle", "medium rectangle", "mobile banner"];
            if(type === undefined || !allowedTypes.includes(type)) {
                throw new Error("Unsupported type");   
            }
            const adType = filteredAds.map(item => item.images[type])
            .filter(value => value !== undefined)
            
            return getRandomAdURL(adType)      
        }

        // Function to return single advertisement 
        // input: [Array(3), Array(3)] or ['https://example.com/example.png', "https://example.com/example.jpg"]
        // output: https://example.com/example.png
        function getRandomAdURL(ads){
            if(ads === undefined || ads === null) return
            const allAdsURLs = Object.values(ads).flat(); // One array ['https://example.com/example.png', "https://example.com/example.jpg"]
            const randomIndex = Math.floor(Math.random() * allAdsURLs.length); 
            return allAdsURLs[randomIndex];
        }

        function getCurrentDomain(){
            return window.location.hostname;
        }
        

        function getRandomAd(data, type, id){
            const { banners } = data;
            const filteredAdsByDomain = filterAdsByDomain(banners, getCurrentDomain());
            const randomAd = filterAdsByType(filteredAdsByDomain, type);   
            setAd(randomAd, id);
            return randomAd
        }

        return fetch(this.configuration)
        .then(res => res.json())
        .then(data => {  
            this.ads = data;
            getRandomAd(data, type, id)
        })
    }
     
}
