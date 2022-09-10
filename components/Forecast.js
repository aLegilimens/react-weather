import ForecastItem from "./ForecastItem";
//displaying the hourly forecast
function Forecast({ forecast }) {
  return (
    <ul>
      {forecast.map((item) => (
        <ForecastItem />
      ))}
    </ul>
  );
}
export default Forecast;
