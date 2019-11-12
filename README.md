 
# Data Visualization
<img src="img/crypto-all-images.jpg" alt="" height="100" align="center"> <br>
This project is attempt to visualize current price of most popular crypto currencies like
Bitcoin, Etherum,Litecoin and Bitcoincash etc. And also provide deep analyse and one year graph of top 12 Crypto currencies.

## UX
 
This website is for people interested in price of crypto-currencies.

The main idea in this UX process design was:

- Keep it simple.
- Focus to use bootstrap when possible.
- Deliver clean easy to read design.

## User stories

### As a visitor I want to have: 

- On Home page

- All-Coins-Analysis

- On Table page

- On News page

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

Languages, frameworks, libraries, and any other tools used to construct this project. 

- HTML 5
    - This project uses **HTML** to structure the content of the website.
- CSS 3
    - The project uses **CSS** to add fonts and some additional styling to the site.
- [Bootstrap](https://getbootstrap.com/)
    - This project uses **Bootstrap** to assist with responsive behaviour and to provide a grid framework.
- [Bootswatch](https://bootswatch.com/)
    - **Bootswatch** was used to provide a theme for Bootstrap. The 'Lux' theme was used for this site. 
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

This project was developed incrementally with continuous use of `console.log` to repeatedly check the changes made on the site and to ensure all changes to source code were providing the desired outcome in the browser. The site was build using Google Chrome browser (version 71) and then later tested in other browsers.

This project was tested for responsiveness using the Chrome Developer Tools mobile device simulator. It was also viewed on physical Samsung Galaxy A5 (2017) mobile device to ensure good responsive behaviour. The site was also tested in Mozilla Firefox (version 65) and Microsoft Edge (version 17) browsers to ensure appearance and functionality of the site was as expected across all 3 of these browsers.
As this project is a data dashboard it designed for desktop or large-screen viewing, however the containers in which the charts are rendered are responsive and scrollbars have been added to allow the charts be viewed as much as possible on smaller screens where possible.

HTML markup and CSS styles were checked using the W3C Validation Tool [here](http://validator.w3.org) and both HTML and CSS files passed without error.

There is no actual user input on the site so there was no form elements and no user input validation required.

All users stories defined at the outset were checked and all were correctly displayed at all times as well as being reactive to user interaction and with each chart being interactive with all related charts.

There are no errors being displayed in the Chrome Dev Tools console when the site loads and when users interacts with the dashboard.

The site was also audited with Chrome Dev Tools' Lighthouse. Using the Applied Fast 3G throttling, the results were good and were as follows on the audit report:

| Performance | Accessibility | Best Practices | SEO |
| :---------: | :------------:|:--------------:|:---:|
| 86          | 88            | 87             | 89  |

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

Website was tested on: 

- laptop
- galaxy s6 s8
- motorola style 

Presented content is displaying properly on each device.

## Deployment

Project was deployed on github-pages if you want to quick check how project look like you can <a href="https://rajaneesh80.github.io/cryptocurrency_dashboard/index.html"> see working project.</a>



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
- In this place I want to say thank You for the great work and fantastic open source library's that are free to use. I also want to thank you to codeinstitute.net for showing me this.