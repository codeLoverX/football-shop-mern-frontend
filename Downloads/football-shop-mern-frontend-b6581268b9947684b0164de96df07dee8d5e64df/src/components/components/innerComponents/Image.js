import React from "react";

function Image({ imgSrc, name, title, price }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={imgSrc} alt={title} />
      <div clasName="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text">{title} </p>
        <p className="card-text">{price} </p>
      </div>
    </div>
  );
}

//<a href="#" className="btn btn-amber lighten-1">Go somewhere</a>

export default Image;
