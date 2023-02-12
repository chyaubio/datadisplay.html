navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const airQualityDataElement = document.getElementById("air-quality-data");
    const errorMessageElement = document.getElementById("error-message");

    // Fetch air quality data for the user's current location
    fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=b4925c40110ed2049ee5f6deb33a490b38a9f1e3`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "error") {
          // If data is not available for the current location, fetch data for the nearest location
          fetch(`https://api.waqi.info/feed/nearest/?token=b4925c40110ed2049ee5f6deb33a490b38a9f1e3`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              airQualityDataElement.textContent = `Air Quality: ${data.data.aqi}`;
            })
            .catch((error) => {
              errorMessageElement.textContent = "Error: " + error;
            });
        } else {
          airQualityDataElement.textContent = `Air Quality: ${data.data.aqi}`;
        }
      })
      .catch((error) => {
        errorMessageElement.textContent = "Error: " + error;
      });
  },
  (error) => {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = "Error: " + error.message;
  }
);
