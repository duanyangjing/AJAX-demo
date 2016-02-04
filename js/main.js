//variable to store the information about the cities
var cityPop = [
    { 
        city: 'Madison',
        population: 233209
    },
    {
        city: 'Shanghai',
        population: 20217700
    },
    {
        city: 'Beijing',
        population: 16446900
    },
    {
        city: 'Hong Kong',
        population: 7055071
    }
];

//initialize function called when the script loads
function initialize(){
    cities();
    jQueryAjax();
    debugAjax();
};

//function to create a table with cities and their populations
function cities(){
    //construct the table from the topmost DOM element
    $("mydiv").append("<table>");
    $("table").append("<tr>");
    $("tr").append("<th>City</th><th>Population</th>")
    // tr is table row, th is table header, td is table data(non-header)
    for (var i = 0; i < cityPop.length; i++) {
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        $("table").append(rowHtml);
    };
};


//function to add one additional column to the exisiting table
function addColumns(){
    //loop through all the tr elements and add citySize to that row
    $('tr').each(function(i){
        //i=0 corresponds to the first row (header) of the table
        if (i == 0){
            //append the third header 'City Size'
            $(this).append('<th>City Size</th>');
        } else {
            //for other rows in the table, add citySize based on population
            var citySize;
            //for cities with population less than 100000, size is small
            if (cityPop[i-1].population < 100000){
                citySize = 'Small';
            //for cities with population between 100000 and 500000, size is medium
            } else if (cityPop[i-1].population < 500000){
                citySize = 'Medium';
            ////for other cities, size is large
            } else {
                citySize = 'Large';
            };
            //append city size as one additional data entry in the current row
            $(this).append('<td>' + citySize + '</td>');
        };
    });
};

//function to add events to the table
function addEvents(){
    //add events to the table when mouse is over the table
    $('table').mouseover(function(){
        //generate color as rgb representation randomly
        var color = "rgb(";

        for (var i=0; i<3; i++){

            var random = Math.round(Math.random() * 255);

            color += random;

            if (i<2){
                color += ",";
            
            } else {
                color += ")";
            };
        //apply the randomly generated color to the color of this table
        $(this).css('color', color);
        };


    });
    //function to respond click on this table
    function clickme(){
        //show alert message
        alert('Hey, you clicked me!');
    };
    //add an event listener to the click event, which runs clickme function
    //when the event happens. Originally this is inside the mouseover block,
    //which does not make sense because the message will appear for every
    //mouseover event. Currently it only shows up when table is clicked.
    $('table').on('click', clickme);
};


//Duanyang's ajax function
//define AJAX function
function jQueryAjax(){
    //basic jQuery ajax method
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: callback
    });
    //This cannot be done outside the callback function
    //console.log(response);
};

//define callback function
function callback(response, status, jqXHRobject){

    //TASKS USING THE DATA GO HERE
    $("mydiv").append("<br>GeoJSON data (from Duanyang's function): " + response + "</br>");
    console.log(JSON.stringify(response));

};


//run all the functions above
$(document).ready(initialize);
$(document).ready(addColumns);
$(document).ready(addEvents);


//Robin's ajax function
//define an ajax function
function debugAjax(){
    //create a variable to store the response of request
    var mydata;
    //jUuery ajax function to send data request
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        //callback function, executed after data is loaded
        success: function(response){
            //store the loaded data to variable mydata
            mydata = response
            //call another function to process the loaded data
            debugCallback(mydata);
        }
    });
    //mydata in the following line is undefined
    //$("mydiv").append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};
function debugCallback(mydata){
    //add the loaded data in string format following the cityPop table
    $("mydiv").append("<br>GeoJSON data (from Robin's function):</br>" + JSON.stringify(mydata));
};