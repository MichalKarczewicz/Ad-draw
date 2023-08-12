# PROGRAM TO DRAW ADS FROM A JSON FILE

A program in vanilla Javascript that randomizes ads on a page by excluding ads from the page they are currently on. 

## Configuration

The program compares the site's domain name, with a banners.link in the ad array, and then displays ads for other sites. 
Use this format. You can add more rel attributes or other target. You can also add more tags. 

{
   "banners":[
      {
         "link":"https://examplepage.com",
         "images":{
            "wide skyscraper":"https://examplepage.com/wide-cokolwiek.png",
         },
         "configuration":{
            "rel":[
               "nofollow",
            ],
            "target":"_blank"
            
         },
         "tags":[
            "weather"
         ]
      },
   ]
}

## MAIN

The program can be used in two ways. In one, you can draw ads without choosing a specific type, or in the other by specifying the type.

> getRandomAd(data);
> getRandomAd(data, "wide skyscraper");

You can immediately set the drawn ad on your page by specifying the name of the container in which the img element is to be added.

>  adClass = "ad"
>  setAdvertisement(getRandomAd(data, "leaderboard"));

