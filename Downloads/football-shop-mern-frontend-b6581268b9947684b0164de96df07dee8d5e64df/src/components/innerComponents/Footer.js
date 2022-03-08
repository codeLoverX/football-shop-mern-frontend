import React from "react";

function Footer({ heading, objectToPara }) {
  return (
    <div>
      <h5> {heading} </h5>
      <div className="text-warning">
        {Object.values(objectToPara).map((item, index, array) => {
          return (
            <small>
              {item} <br />{" "}
            </small>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;
