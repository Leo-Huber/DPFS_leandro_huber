import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserForm from "./UserForm";
import ProductForm from "./ProductForm";
import "./dashboard.css";

const API = "/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // Cargar usuarios y productos
  const fetchData = async () => {
    try {
      const usersRes = await fetch(`${API}/users`);
      const productsRes = await fetch(`${API}/products`);
      setUsers(await usersRes.json());
      setProducts(await productsRes.json());
    } catch (err) {
      Swal.fire("Error", "No se pudo cargar los datos", "error");
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- Usuarios ---
  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });
    if (result.isConfirmed) {
      const res = await fetch(`${API}/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        Swal.fire("¡Eliminado!", "Usuario eliminado.", "success");
        fetchData();
      } else {
        Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      }
    }
  };

  // --- Productos ---
  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });
    if (result.isConfirmed) {
      const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        Swal.fire("¡Eliminado!", "Producto eliminado.", "success");
        fetchData();
      } else {
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
      }
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-actions">
        <button onClick={() => { setEditingUser(null); setShowUserForm(true); }}>Agregar Usuario</button>
        <button onClick={() => { setEditingProduct(null); setShowProductForm(true); }}>Agregar Producto</button>
      </div>

      {/* USUARIOS */}
      <h3>Usuarios ({users.length})</h3>
      <table className="dashboard-table">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => { setEditingUser(u); setShowUserForm(true); }}>Editar</button>
                <button className="danger" onClick={() => handleDeleteUser(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PRODUCTOS */}
      <h3>Productos ({products.length})</h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th> {/* NUEVO */}
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category || "Sin categoría"}</td> {/* NUEVO */}
              <td>${Number(p.price).toFixed(2)}</td>
              <td>
                <button onClick={() => { setEditingProduct(p); setShowProductForm(true); }}>Editar</button>
                <button className="danger" onClick={() => handleDeleteProduct(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formularios Modales */}
      {showUserForm &&
        <UserForm
          user={editingUser}
          onClose={(reload = false) => {
            setShowUserForm(false);
            if (reload) fetchData();
          }}
        />
      }
      {showProductForm &&
        <ProductForm
          product={editingProduct}
          onClose={(reload = false) => {
            setShowProductForm(false);
            if (reload) fetchData();
          }}
        />
      }
    </div>
  );
}
