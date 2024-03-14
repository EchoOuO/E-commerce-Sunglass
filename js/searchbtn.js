// Adicionando o jQuery do Google CDN
const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
document.head.appendChild(script);

// Get the search button, input, and results elements
const searchBtn = $("#search-btn");
const searchInput = $("#search-input");
const searchResults = $("#search-results");

// Event handler for search button click
searchBtn.click((e) => {
  e.preventDefault(); // Prevent the default action
  searchInput.toggle(500); // Toggle the visibility of the search input
  if (searchInput.is(":visible")) {
    searchInput.focus(); // Focus the search input if it is visible
  }
  searchResults.hide();
});

// Fetch data from JSON file
$.getJSON("./js/search-json.json", function (data) {
  // Event handler for search input keyup
  searchInput.on("keyup", function () {
    var query = $(this).val(); // Get the value of the search input
    // Filter the data to include only items that contain the query string
    var results = data.filter(function (item) {
      // Assuming the item is an object and has a property 'Name' to search from
      return item.Name.toLowerCase().includes(query.toLowerCase());
    });
    $("#results").empty(); // Clear the previous results
    results.slice(0, 10).forEach((item) => {
      $("#results").append(
        `<li><a href="${item.Url}" target="_blank">${item.Name}</a></li>`
      );
    });
    if (query === "") {
      searchResults.hide(); // Hide the results container if the input is empty
    } else {
      searchResults.show(); // Show the results container if the input is not empty
    }
  });
});
