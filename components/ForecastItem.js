import { useEffect, useState } from "react";
//displaying hourly forecast
function ForecastItem(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(props.array);
    console.log(items);
  });

  return (
    <div>
      <p className="subheading">Hourly forecast</p>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index} className="">
              <div>
                <img
                  src={require(`../public/icons/${item.icon}.png`)}
                  alt="Icon"
                ></img>
              </div>
              <div className="temps">
                {item.minTemp} °/ {item.maxTemp} °
              </div>
              <div className="time">{item.time}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default ForecastItem;
