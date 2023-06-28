const contactUsTemplate = ({
  firstName,
  lastName,
  email,
  topic,
  message,
}: Record<
  'firstName' | 'lastName' | 'email' | 'topic' | 'message',
  string
>) => {
  return `
        <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Information</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                color: #333333;
                margin: 0;
                padding: 0;
                }

                .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #CCCCCC;
                border-radius: 5px;
                background-color: #F2F2F2;
                }

                .section {
                margin-bottom: 20px;
                }

                .section-title {
                font-weight: bold;
                margin-bottom: 5px;
                }

                .section-data {
                font-weight: normal;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h2>Contact Information</h2>
                <div class="section">
                <div class="section-title">First Name:</div>
                <div class="section-data">${firstName}</div>
                </div>
                <div class="section">
                <div class="section-title">Last Name:</div>
                <div class="section-data">${lastName}</div>
                </div>
                <div class="section">
                <div class="section-title">Email:</div>
                <div class="section-data">${email}</div>
                </div>
                <div class="section">
                <div class="section-title">Topic:</div>
                <div class="section-data">${topic}</div>
                </div>
                <div class="section">
                <div class="section-title">Message:</div>
                <div class="section-data">${message}</div>
                </div>
            </div>
            </body>
            </html>
    `;
};

export default contactUsTemplate;
