let currentImage = 0; 
const backgroundImages = [
    'url("resources/mooMouthOpen.jpg")', 
    'url("resources/moodengweird.jpg")'  
];

function changeBackgroundImage() {
    currentImage = (currentImage + 1) % backgroundImages.length; 
    $('body').css('background-image', backgroundImages[currentImage]); 
}


let searchResults = []; 

function apiSearch() {
    var params = {
        'q': $('#textbox').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '05d426dab2424a1e887e842f4eb8d176'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            searchResults = data.webPages.value; 

            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').css('display', 'block'); 
            changeBackgroundImage();
        })
        .fail(function () {
            alert('error');
        });
}

function showTime() {
    var currentTime = new Date(); 
    var hours = currentTime.getHours().toString().padStart(2, '0'); 
    var minutes = currentTime.getMinutes().toString().padStart(2, '0'); 
    var formattedTime = hours + ':' + minutes; 
    var timeDisplay = document.getElementById("time-display");
    timeDisplay.innerHTML = "Current Time: " + formattedTime; 
    timeDisplay.style.visibility = "visible"; 
}

function feelingLucky() {
    if (searchResults.length > 0) {
        window.location.href = searchResults[0].url;
    } else {
        alert('No results found. Please try searching first.');
    }
}


$(document).ready(function () {
    $('#searchForm').submit(function (event) {
        event.preventDefault(); 
        apiSearch(); 
    });

    $('#title').click(function () {
        var newImage = 'url("resources/moodengweird.jpg")'; 
        $('body').css('background-image', newImage);
        $('#message').css('display', 'block'); 
    });
    $('#luckyButton').click(function () {
        if (searchResults.length > 0) {
            window.location.href = searchResults[0].url; 
        } else {
            alert('No results found. Please try searching first.');
        }
    });

});
