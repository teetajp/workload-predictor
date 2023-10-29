const dotenv = require('dotenv');
const { Client } = require('@notionhq/client');
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function queryDatabase(databaseId, username) {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            // "filter": {
            //     "property": "Name",
            //     "rich_text": {
            //         "contains": username
            //     }
            // }
          });  
        return response.results;
    } catch (error){
        console.log(error.body);
    }
}

function convertToJson(results) {
    
}

queryDatabase(databaseId, 'C4 Lecture Ticket')
    .then(result => {
        
        result.forEach(result => {
            if ( (result) != undefined) {
                if ((result.properties.Name.title[0]) != undefined) {
                    console.log(result.properties.Name.title[0].plain_text);
                }   
                
                if ((result.properties.Dates.date) != undefined) {
                    console.log(result.properties.Dates.date.start);
                    
                }

                if ((result.properties.Type.select) != undefined) {
                    console.log(result.properties.Type.select.name.slice(3, ));
                    console.log("\n");
                }
                
            }
        });
        convertToJson(result);
    });

