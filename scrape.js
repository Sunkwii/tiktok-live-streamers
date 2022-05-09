const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.tiktok.com/live";

async function scrapeData() {
	
  try {
	  
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("a");
    const accounts = [];

    listItems.each((idx, el) => {

      const pageLink = { uri: "" };

      pageLink.uri = $(el).attr("href");
		
	  if(pageLink.uri.includes('@')){
		  accounts.push(pageLink);
	  }
    });

    console.dir(accounts);

    fs.writeFile("accounts.json", JSON.stringify(accounts, null, 2), (err) => {
		
      if (err) {
        console.error(err);
        return;
      }
	  
      console.log("Successfully written data to file");
    });
  } catch (err) {
	  
    console.error(err);
  }
}

scrapeData();