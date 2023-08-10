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
  
const getRandomAd = (ads) =>{
    const { banners } = ads;
    const currentDomain = window.location.hostname;

    console.log('Aktualna nazwa domeny:', currentDomain);

    console.log(banners)
}


  

const main = () => {
    getAdsList()
}

window.onload = () => {
    console.log("App started");
    main()
};