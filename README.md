# Updates
<b>All good things must come to an end.</b>
                        <p>Hi, thanks for your support and love for this project.</p>
                        <p>Unfortunately, this project are no longer working as for 26th October 2017 due to KTMB new <a href="http://www.ktmb.com.my/ktmb_ui/">updated website</a>. They have revamped their website design with more user friendly and beautiful design. Along with this update, they also have removed their old JSON API links, which I used to fetch the data</p>
                        <p>Sure enough, I was able to find their new JSON API links, but unfortunately, the tricky parts is for train results, which does not have any API links since they directly output it to the page. On top of that, they used AJAX in order to render the page, so, normal scraping with PHP is difficult or cannot be done at all.</p>
                        <p>For more info, see the Issue on the project GitHub page: <a href="https://github.com/afzafri/KTMB-Train-Ticket-Checker/issues/1">https://github.com/afzafri/KTMB-Train-Ticket-Checker/issues/1</a></p>
                        <p>Your helps and contributions are welcome.</p><br>
                        <p>Thank You,<br>
                        Afif Zafri</p>

<hr>

# KTMB Train Ticket Checker
- Web based application for fetching the list of available trains tickets for KTMB Trains
- This project mainly focus on the Frontend, which are using jQuery, Materialize Framework, Animate.css
- All data are fetched directly from KTMB e-Ticket website, but this project is not using KTMB official API

# Installation
- Local/Server
  - Clone this repo: ```git clone https://github.com/afzafri/KTMB-Train-Ticket-Checker.git```
- Heroku
  - [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Main Files
- ```api.php``` - PHP codes for fetching the JSON data from KTMB website. Need to use PHP since KTMB website does not enable CORS.
- ```/assets/js/script.js``` - Javascript & jQuery codes for client side data processing

# Credits
- KTMB: http://www.ktmb.com.my/
- Materialize: http://materializecss.com/
- jQuery Framework: https://jquery.com/
- Animate.css: https://daneden.github.io/animate.css/

# License
This library is under ```MIT license```, please look at the LICENSE file
