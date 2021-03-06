// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Create a function to display the table of data
function tableBuild(ufoSightData){
    // Remove any data from the table body
    tbody.html("");
    //Loop Through `data` and console.log each UFO report object
    ufoSightData.forEach(function(ufoData){  
        //Use d3 to append one table row `tr` for each UFO report object
        var row = tbody.append("tr");
        //Use `Object.entries` to console.log each UFO report value
        Object.entries(ufoData).forEach(function([key, value]){  
            //Use d3 to append 1 cell per UFO report value (datetime, city, state, country, shape, durationMinutes, comments)
            var cell = row.append("td");
            //Use d3 to update each cell's text with UFO report values (datetime, city, state, country, shape, durationMinutes, comments)
            cell.text(value);
        })
    })
};


// Complete the event handler function for the form
function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input element, get the raw HTML node and get the value property of the input element
    var dates = d3.select("#datetime").property("value");
    // Create a copy of the data
    var filteredData = tableData;
    // If date provided is True, then..
    if (dates){
        // Filter the data to match the date provided by the user
        filteredData = filteredData.filter(sightDate => sightDate.datetime === dates);
        console.log(filteredData);
    }

    // If no data returned, then..
    if(filteredData.length == 0){
        d3.select("#message").text("No data found!");
    }
    else {
        d3.select("#message").text("");
    }

    // Call the tableBuild function and pass the filtered data with matching date provided by the user
    tableBuild(filteredData);
    // log the filtered data
    console.log(filteredData);
};

// Select the button
var filterButton = d3.selectAll("#filter-btn");
// Select the form
var form = d3.selectAll("#form");

// Create event handlers 
filterButton.on("click", runEnter);
form.on("submit", runEnter);

// Call the function 'tableBuild' to get the original data
tableBuild(tableData);
