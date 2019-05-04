
import React from "react";
import bus from"./images/bus.png";
import plane from "./images/plane.png";
import train from "./images/train.png";
import ship from "./images/ship.png";

const imageHandler = (data, images) => {
  
  data.map(row => {

    images.map((imageIndex) => {
      
      const imageType = row[imageIndex].toLowerCase();
      switch (imageType) {
        case "авто":
          row[imageIndex] = <img className="transport" src={bus} alt="aвто"></img>;
          break;
        case "авиа":
          row[imageIndex] = <img className="transport" src={plane} alt="авиа"></img>;
          break;
        case "жд":
          row[imageIndex] = <img className="transport" src={train} alt="жд"></img>;
          break;
        case "море":
          row[imageIndex] = <img className="transport" src={ship} alt="море"></img>;
          break;
        case "море+жд":
          row[imageIndex] = <div>
            <img className="transport" src={ship} alt="море"></img>
            <img className="transport" src={train} alt="жд"></img>
          </div>
          break;
        default:
      }

      return null;
    })
    return null;
  });
  return data;
}

export default imageHandler;