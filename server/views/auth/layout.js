module.exports = ({ content }) => {
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
               </head>
               <body>
                    <div class="ui container">
                         ${content}               
                    </div>
               </body>
          </html>
     `;
};
