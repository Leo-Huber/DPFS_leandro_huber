// dashboard/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';
import { getAllProducts } from '../services/productService';
import StatisticCard from './StatisticCard';
import LastItemCard from './LastItemCard';
import ProductList from './ProductList';
import UserList from './UserList';

const Dashboard = () => {
  const [usersData, setUsersData] = useState({ count: 0, users: [] });
  const [productsData, setProductsData] = useState({ count: 0, countByCategory: {}, products: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uData = await getAllUsers();
        const pData = await getAllProducts();
        setUsersData(uData);
        setProductsData(pData);
      } catch (err) {
        console.error('Error al obtener datos:', err);
      }
    };
    fetchData();
  }, []);

  const lastUser = usersData.users[0] || null;       // Usuarios ordenados desc por createdAt
  const lastProduct = productsData.products[0] || null; // Productos ordenados desc

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard Green Harvest</h1>

      {/* Estadísticas generales */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <StatisticCard title="Total Usuarios" value={usersData.count} />
        <StatisticCard title="Total Productos" value={productsData.count} />
        <StatisticCard title="Categorías" value={Object.keys(productsData.countByCategory).length} />
      </div>

      {/* Último usuario y último producto */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        {lastUser && (
          <LastItemCard
            title="Último Usuario"
            name={`${lastUser.firstName} ${lastUser.lastName}`}
            image={lastUser.image}
          />
        )}
        {lastProduct && (
          <LastItemCard
            title="Último Producto"
            name={lastProduct.name}
            image={lastProduct.image}
          />
        )}
      </div>

      {/* Listado de usuarios y productos */}
      <div style={{ display: 'flex', gap: '50px' }}>
        <div style={{ flex: 1 }}>
          <h2>Listado de Usuarios</h2>
          <UserList users={usersData.users} />
        </div>
        <div style={{ flex: 2 }}>
          <h2>Listado de Productos</h2>
          <ProductList products={productsData.products} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
