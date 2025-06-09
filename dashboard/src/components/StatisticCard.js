// dashboard/src/components/StatisticCard.js
import React from 'react';

const cardStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  textAlign: 'center',
  width: '150px',
  background: '#f8f8f8'
};

const StatisticCard = ({ title, value }) => (
  <div style={cardStyle}>
    <h3>{title}</h3>
    <p style={{ fontSize: '1.5em', margin: 0 }}>{value}</p>
  </div>
);

export default StatisticCard;
