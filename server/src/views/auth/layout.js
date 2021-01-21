const { nameError } = require("../helpers");

module.exports = ({ header, content, extraContent }) => {
  return `
     <!DOCTYPE html>
          <html lang="en">
               <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Social</title>
                    <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
                  />
                  <link rel="stylesheet" href="/style.css"></link>
               </head>
               <body>               
                    <div class="ui container">
                         <div class="ui middle aligned two column centered grid">
                              <div class="ui card column">
                                   <div class="content">
                                        <div class="header">${header}</div>
                                   </div>
                                   <div class="content">
                                    
                                        ${content} 
                                   </div> 
                                   <div class="extra content">
                                        ${extraContent}
                                   </div>
                              </div>
                         </div>             
                    </div>
              </body>
          </html>
     `;
};
