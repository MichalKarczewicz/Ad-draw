# PROGRAM TO DRAW ADS FROM A JSON FILE

A program in vanilla Javascript that randomizes ads on a page by excluding ads from the page they are currently on. 

## Configuration

The program compares the site's domain name, with a banners.link in the ad array, and then displays ads for other sites. 
Use this format. You can add more rel attributes or other target. You can also add more tags. 

```json
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
```

## MAIN

The draw function is used to add an ad. Specify the type and id of the item to be added.

> let adDrawer= new AdDrawer('./payload.json'); 

>  adDrawer.draw("large rectangle","ad");


