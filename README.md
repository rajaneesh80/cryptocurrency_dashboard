 
# Raj-Crypto_Currency_Dashboard

<img src="img/crypto-all-images.jpg" alt="" height="100" align="center"> <br> <br>

The use  <strong> [Qlik] </strong> (https://www.qlik.com/) for sales data analysis, it inspired me to make similar dashboard for cryptocurrencies, maybe in future, I may develop a similar app as Qlik for the workplace.

This project is an attempt to visualise the current price of most popular cryptocurrencies like
Bitcoin, Etherum, Litecoin and Bitcoin cash etc. Furthermore, provide deep analyse and one year graph of top 12 Cryptocurrencies.

all 12 currencies live summary of (COIN ID, ICON, Current Price, 24H High, 24H Low, Market Cap,  % CHANGE In 24H, Supply,  7-Day's Chart $) also presented in table format.

Crypto Currencies Newsfeed also added to the app to make the app more interactive to the user.

<hr>

## UX
 
This website is for people interested in crypto-currencies trading and analysis.

The main idea in this UX process design was:

- Keep it simple.
- Focus to use bootstrap when possible.
- Deliver clean easy to read design.

<hr>

## User stories

### As a visitor I want to have: 

- On Home Page:
    
    - the very first thing the use see the Last Updated : Local time 

    - A top 12 crypto-currencies coin grid with the Coin Image Icon up and down arrow sign
     changes the colour if the price gone up and red if the price gone down.

    - When use hover on Coin name tool tip show Yearly Graph message if user clicked it  redirect the user to coin Yearly Graph page

    - Coin Yearly Graph  page shows  last updated  local time on top and the coin (Coin Icon, Current Value, Today's Highest, Today's Lowest, % Change,  Market Cap) current values in table format underneath the  coin summary use can see the coin one year line chart with date & price toll tip.

    - When use hover on Coin Icon tool tip show Yearly Analysis message if user clicked it  redirect the user to the coin Yearly Analysis page.

    - Coin Yearly Analyis page have got:

        - Monthly Volume Pie Chart the chart also has 12 colourful legends for each month to make it easy for the user if he or she wishes to analyse the coin date by months.  

        - Monthly bubble chart to see witch months was performing the best so the user can expect that these months are the best to invest.

        - Monthly bubble chart to have the option to select given months so the user can analyse only this month.

        - Days of week chart to see and select days so the user can see how these days were performing 

        - Days by fluctuation so the user can see daily histogram price change and filter by selecting the most exciting range. 

        - Days by Loose/Gain so the user can see how many days were gaining and losing in selected period so the user can filter by gain and lose days.

        - Data Table shows the coin Date - Close -High - Low and Open values based on the user-selected range

- All-Coins Analysis:

    -  if the user is interested in the analysis, he or she can see all the coins analysis and yearly chart hyperlinks in one-page in a table format.

- Table:

    - the user can see all the coin live price summary in one page 

- News
    - the user can read current crypto market news in one page 

### As a developer I want to have: 
:


    
## Features

The data used to power charts in this project is delivered by: https://www.cryptocompare.com/

### Existing Features


### Features Left to Implement

- Because site relies heavily on data from https://www.cryptocompare.com/. It cannot work without the connection to the internet. Page should inform the user when:

    - Data is not loaded.
    - There is lost in internet connectivity. 

## Technologies Used

- HTML 5
    - This project uses **HTML** to structure the content of the website.
- CSS 3
    - The project uses **CSS** to add fonts and some additional styling to the site.
- [Bootstrap](https://getbootstrap.com/)
    - This project uses **Bootstrap** to assist with responsive behaviour and to provide a grid framework.
 - JavaScript
    - The project uses **JavaScript** to add animations, retrieve data from the third-party API and to build the charts displayed on the dashboard.
- [jQuery](https://jquery.com/)
    - This project uses **jQuery** to assist in making asynchronous requests for third-party data and also to simplify DOM manipulation.
- [D3.js](https://d3js.org/)
    - The project uses **D3.js Version 3 and 4** to for data visualization.
- [DC.js](https://dc-js.github.io/dc.js/)
    - The JavaScript library **DC.js** was used on top of D3.js to build reactive charts that provide instant feedback to user interaction.
- [Crossfilter](http://square.github.io/crossfilter/)
    - The **Crossfilter** JavaScript library was used to work with a multidimensional dataset and to support chart interaction.


## Testing

This project was developed incrementally with continuous use of `console.log` to repeatedly check the changes made on the site and to ensure all changes to source code were providing the desired outcome in the browser. The site was build using Google Chrome browser (version -78.0.3904.97) and then later tested in other browsers.

This project was tested for responsiveness using the Chrome Developer Tools mobile device simulator. 

It was also viewed on physical Apple 10, 8, 7 , 6 and 5 mobile device to ensure good responsive behaviour. 

The site was also tested in Mozilla Firefox (version 70.0.1) and Microsoft Edge (44.18362.387.0) browsers to ensure appearance and functionality of the site was as expected across all 3 of these browsers.

As this project all the pages are fully resposive and designed for mobile first, desktop and large-screen viewing.

HTML markup and CSS styles were checked using the W3C Validation Tool [here](http://validator.w3.org) and both HTML and CSS files passed without error.

There is no actual user input on the site so there was no form elements and no user input validation required.

All users stories defined at the outset were checked and all were correctly displayed at all times as well as being reactive to user interaction and with each chart being interactive with all related charts.

There are no errors being displayed in the Chrome Dev Tools console when the site loads and when users interacts with the dashboard.

The site was also audited with Chrome Dev Tools' Lighthouse. Using the Applied Fast 3G throttling, the results were good and were as follows on the audit report:

| Performance | Accessibility | Best Practices | SEO |
| :---------: | :------------:|:--------------:|:---:|
| 88          | 72           | 71             | 82  |

(_Progressive Web App audit scoring has been removed as the site was not intended to operate as a PWA_.)


Home page:

1. 
    1. Clicking multiple times on coin icons and coin heading doesn't load scripts before data is loaded times
    2. coin icons and coin heading  are showing correct scope dates on charts after click
    3. Each click is 

2. Graphs page are showing correctly the:
    1. Last price
    2. 
    3. 
    4. 

Coin analyse page:

1. Charts:
    1. Are displaying data correctly
    2. Correctly link between all charts.
    3. Bubble charts are selecting months correctly
    4. Volume charts are selecting range of data correctly.
    5. Days of week are selecting weeks correctly.
    5. Days by fluctuation are selecting them correctly.

## Deployment

GitHub was used for version control and to host the code by pushing all code to the repo on GitHub.

This project was then deployed on GitHub Pages by simply accessing the project's settings page then selecting the Master branch in the drop-down menu for deploying the project on GitHub Pages.

The live project can be viewed <strong> [here] </strong> (https://rajaneesh80.github.io/cryptocurrency_dashboard/index.html/).

### Javascript files
Few important things to notice:

//js have to folders: 
folder. 

## Credits

## Media



### Acknowledgements

- This project heavily depends on d3, dc, crossfilter .js librarys
- When creating this project I used this examples - without them I could not complete this project:  
    - https://dc-js.github.io/dc.js/examples/
    - https://dc-js.github.io/dc.js/
- [DC.js Tutorial](https://www.tutorialspoint.com/dcjs/) on TutorialsPoint
- [Getting to know Crossfilter](https://animateddata.co.uk/articles/crossfilter/) article by Peter Cook
- [Crossfilter Tutorial](http://blog.rusty.io/2012/09/17/crossfilter-tutorial/) by Rusty Klophaus
- In this place I want to say thank You for the great work and fantastic open source library's that are free to use. I also want to thank you to codeinstitute.net for showing me this.