 
# Raj-Crypto_Currency_Dashboard

<img src="img/crypto-all-images.jpg" alt="" height="100" align="center"> <br> <br>

I use [Qlik](https://www.qlik.com/) for sales data analysis, it inspired me to make a similar dashboard for cryptocurrencies, maybe in future, I may develop a similar app as Qlik for my workplace.

This project is an attempt to show the current price of most popular cryptocurrencies like
Bitcoin, Etherum, Litecoin and Bitcoin cash etc in table format. Furthermore, this app also provides one year deep analyse and one-year price variation graph of 12 Cryptocurrencies.

live price summary table of all 12 currencies with <strong> COIN ID, ICON, Current Price, 24H High, 24H Low, Market Cap,  % CHANGE In 24H, Supply, 7-Day's Chart $ </strong> header and Crypto Currencies Newsfeed make this app more interactive to the user.

<hr>

## UX
 
This website is for people interested in crypto-currencies trading and analysis.

The main idea in this UX process design was:

- Keep it simple.
- Focus to use bootstrap when possible.
- Deliver clean, easy to read design.

## UX Design

Details of the UX design undertaken as part of this project is available in the Wirefra folder. These documents outline how I approached the design of this website.

<hr>

### As a visitor I want to have: 

- On Home Page:
    
    - the very first thing the user sees the Last Updated: Local time. 

    - after time 12 crypto-currencies coins grid shows the current coin price, an image with up and down arrow, the arrow changes the colour if the coin last price goes up and down.

    - When the user hovers on coin name tooltip show Yearly Graph message if the user clicked it redirect the user to coin Yearly Graph page.

    - Coin Yearly Graph page shows last updated local time and the coin current summary with Coin Icon, Current Value, Today's Highest, Today's Lowest, % Change, Market Cap values in a table format.

    Underneath the coin, summary user can see the coin one-year line chart with circle tooltip.
    If the user hovers on circles, it shows date & price.

    - When the user hovers coin image tooltip show Yearly Analysis message if the user clicked on the image, it redirects the user to the coin Yearly Analysis page.

    - Coin Yearly Analysis page has got:

        - Monthly Volume Pie Chart the chart also has 12 colourful legends for each month to make it easy for the user if the user wishes to analyse the coin by months.  

        - Monthly bubble chart to see which months were performing the best so the user can expect that these months are the best to invest.

        - Monthly bubble chart to have the option to select given months so the user can analyse only this month.

        - Days of week chart to see and select days so the user can see how these days were performing 

        - Days by fluctuation so the user can see daily histogram price change and filter by selecting the most exciting range. 

        - Days by Loose/Gain so the user can see how many days were gaining and losing in selected period so the user can filter by gain and lose days.

        - Data Table shows the Date - Close -High - Low and Open values based on the user-selected range

- All-Coins Analysis:

        - if the user is interested in the analysis, all the coins analysis and yearly chart hyperlink available in the navbar.

- Table:

    - the user can see all the coin live price summary in one page 

- News
    - the user can read current crypto market news in one page

## Features

The data used to power charts in this project is delivered by: https://www.cryptocompare.com/

### Existing Features

On Yearly Graph page (d3 library)

- the coin yearly price variation with tooltip

On Analyse page: (d3, crossfilter, dc)

- Days by Fluctuation(%)
- Days by Gain/Loss
- Monthly Volume Chart
- Monthly bubble chart
- Day of Week
- Data table

On the table page : (Bootstrap table)

- COIN ID
- ICON
- Current Price
- 24H High
- 24H Low
- Market Cap
- % CHANGE In 24H
- Supply
- 7-Day's Chart $

All the Analysis page :

- hyperlinks for in-depth analysis and yearly graph for all 12 coins in table format with coin ID and Image.

News page :
- Crypto Market News.

### Features Left to Implement

- Because the site relies heavily on data from https://www.cryptocompare.com/. It cannot work without connection to the internet. The page should inform the user when:

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
- [Font Awesome](https://fontawesome.com)
    - the The project uses **Font Awesome** for Nav-Icons.

## Testing

This project was developed incrementally with continuous use of `console.log` to check the changes made on the site repeatedly and to ensure all changes to source code were providing the desired outcome in the browser. The site was build using Google Chrome browser (version -78.0.3904.97) and then later tested in other browsers.

This project was tested for responsiveness using the Chrome Developer Tools mobile device simulator. 

It was also viewed on physical Apple 10, 8, 7, 6 and 5 mobile device to ensure proper, responsive behaviour, and the screenshots added to the responsive test folder.

The site was also tested in Mozilla Firefox (version 70.0.1) and Microsoft Edge (44.18362.387.0) browsers to ensure appearance and functionality of the site was as expected across all 3 of these browsers.

As this project, all the pages are fully responsive and designed for mobile-first, desktop and large-screen viewing.

HTML markup and CSS styles were checked using the W3C Validation Tool [here](http://validator.w3.org) and both HTML and CSS files passed without error.

There is no actual user input on the site, so there was no form elements and no user input validation required.

All users stories defined at the outset were checked, and all were correctly displayed at all times as well as being reactive to user interaction and with each chart being interactive with all related charts.

No errors are being displayed in the Chrome Dev Tools console when the site loads and when users interact with the dashboard.

The site was also audited with Chrome Dev Tools' Lighthouse. Using the Applied Fast 3G throttling, the results were excellent and were as follows in the audit report:

| Performance | Accessibility | Best Practices | SEO |
| :---------: | :------------:|:--------------:|:---:|
| 88          | 72           | 71             | 82  |

(_Progressive Web App audit scoring has been removed as the site was not intended to operate as a PWA_.)

However, the site was manually tested also:

Home page:

1. Hyper-Links

    1. Clicking multiple times on hyperlinks does not load scripts before data is loaded times
    2. hyperlinks are showing correct scope dates on charts after the click.

Table page:

    make sure; the table is showing correct below values for each coin 

       1. COIN ID
       2. ICON
       3. Current Price
       4. 24H High
       5. 24H Low
       6. Market Cap
       7. % CHANGE In 24H
       8. Supply
       9. 7-Day's Chart $


graph and analyse page:

1. Charts:
    1. Are displaying data correctly
    2. Correctly link between all charts.
    3. Bubble charts are selecting months correctly
    4. Volume charts are selecting a range of data and months correctly.
    5. Days of the week are selecting weeks correctly.
    5. Days by fluctuation are selecting them correctly.
    6. Yearly line chart showing the correct data in the tooltip.

## Deployment

GitHub was used for version control and to host the code by pushing all code to the repo on GitHub.

This project was then deployed on GitHub Pages by simply accessing the project's settings page then selecting the Master branch in the drop-down menu for deploying the project on GitHub Pages.

The live project can be viewed [here](https://rajaneesh80.github.io/cryptocurrency_dashboard/index.html).

If you wish to run this site locally, please clone or download this repo. You can then run index.html or open index.html in your browser.

## Credits:
    all data coming from https://www.cryptocompare.com/, I would like to give thanks to crypto compare API team.

## Media
The images for coins were also taken from the: https://github.com/atomiclabs/cryptocurrency-icons

### Acknowledgements

- This project heavily depends on d3, dc, crossfilter .js libraries
- When creating this project, I used these examples - without them, I could not complete this project:  
    - https://dc-js.github.io/dc.js/examples/
    - https://dc-js.github.io/dc.js/
- [DC.js Tutorial](https://www.tutorialspoint.com/dcjs/) on TutorialsPoint
- [Getting to know Crossfilter](https://animateddata.co.uk/articles/crossfilter/) article by Peter Cook
- [Crossfilter Tutorial](http://blog.rusty.io/2012/09/17/crossfilter-tutorial/) by Rusty Klophaus
- In this place, I want to say thank You for the great work and fantastic open-source library's that are free to use. I also want to thank you to codeinstitute.net for showing me this.

### Authors

Rajaneesh Singh Bhadauria - This project was completed as part of Code Institute’s Mentored Online Full Stack Web Development course in 2019.
