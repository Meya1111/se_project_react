import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";

function WeatherCard({ weatherData }) {
  const data = weatherData || {};
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {data.temp.F} &deg; F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
