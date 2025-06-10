import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/users'),
          axios.get('http://localhost:3000/api/products'),
        ]);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!users.length && !products.length) return <div>No hay datos para mostrar.</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <div>
        <h3>Usuarios</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Productos</h3>
        <ul>
          {products.map((prod) => (
            <li key={prod.id}>
              {prod.name} - ${Number(prod.price).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
