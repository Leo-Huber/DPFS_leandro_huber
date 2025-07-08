import React from 'react';

const cardStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  textAlign: 'center',
  width: '200px',
  background: '#f8f8f8'
};

const imgStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '50%',
  marginBottom: '10px'
};

const LastItemCard = ({ title, name, image }) => (
  <div style={cardStyle}>
    <h4>{title}</h4>
    {image && <img src={image} alt={name} style={imgStyle} />}
    <p>{name}</p>
  </div>
);

export default LastItemCard;
