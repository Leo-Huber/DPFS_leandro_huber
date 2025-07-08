import React from 'react';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  margin: '10px',
  width: '150px',
  background: '#fff'
};

const imgStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  marginBottom: '10px'
};

const ProductList = ({ products }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {products.map(p => (
      <div key={p.id} style={cardStyle}>
        {p.image && <img src={p.image} alt={p.name} style={imgStyle} />}
        <p style={{ margin: 0, fontWeight: 'bold' }}>{p.name}</p>
        <p style={{ margin: 0 }}>${p.price.toFixed(2)}</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>{p.category}</p>
      </div>
    ))}
  </div>
);

export default ProductList;
