import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtiene los usuarios y productos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch('/api/users');
        const productsRes = await fetch('/api/products');
        if (!usersRes.ok) throw new Error('Error al obtener usuarios');
        if (!productsRes.ok) throw new Error('Error al obtener productos');
        const usersData = await usersRes.json();
        const productsData = await productsRes.json();
        setUsers(usersData);
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Cargando...</div>;
  if (error) return <div style={{ color: 'red', padding: 40 }}>{error}</div>;

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', background: '#f8f4e5', minHeight: '100vh' }}>
      <h1 style={{ color: '#527744', marginBottom: 30 }}>Dashboard</h1>
      <div style={{ display: 'flex', gap: 50 }}>
        {/* Usuarios */}
        <div>
          <h2>Usuarios ({users.length})</h2>
          <ul>
            {users.map(u => (
              <li key={u.id}>
                <b>{u.firstName} {u.lastName}</b> - {u.email}
              </li>
            ))}
          </ul>
        </div>
        {/* Productos */}
        <div>
          <h2>Productos ({products.length})</h2>
          <ul>
            {products.map(p => (
              <li key={p.id}>
                <b>{p.name}</b> - ${Number(p.price).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
