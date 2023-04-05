import React, { useState, useEffect } from "react";

const Location = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
      },
      error => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div>
      {location.latitude && location.longitude ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Location;
