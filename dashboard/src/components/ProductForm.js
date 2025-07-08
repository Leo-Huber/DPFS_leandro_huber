import React, { useState } from "react";
import Swal from "sweetalert2";

const API = "/api/products";

export default function ProductForm({ product, onClose }) {
  const [form, setForm] = useState({
    name:        product?.name || "",
    price:       product?.price || "",
    category:    product?.category || "",
    image:       product?.image || "",
    description: product?.description || "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value ?? "" });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Validación simple
    if (!form.name || !form.price || !form.description) {
      Swal.fire("Faltan datos", "Completa todos los campos obligatorios", "warning");
      return;
    }
    const method = product ? "PUT" : "POST";
    const url = product ? `${API}/${product.id}` : API;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      onClose();
      Swal.fire("¡Éxito!", `Producto ${product ? "actualizado" : "creado"}`, "success");
    } else {
      Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(30,40,50,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000
    }}>
      <form style={{
        background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 2px 16px #2222", minWidth: 350, maxWidth: 400
      }} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 16 }}>{product ? "Editar" : "Agregar"} Producto</h2>
        <label>
          Nombre:<br />
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: "100%" }} />
        </label>
        <br /><br />
        <label>
          Precio:<br />
          <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} required style={{ width: "100%" }} />
        </label>
        <br /><br />
        <label>
          Categoría:<br />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Ej: Verduras, Panadería..." style={{ width: "100%" }} />
        </label>
        <br /><br />
        <label>
          Imagen (URL opcional):<br />
          <input name="image" value={form.image} onChange={handleChange} placeholder="/images/products/default.png" style={{ width: "100%" }} />
        </label>
        <br /><br />
        <label>
          Descripción:<br />
          <textarea name="description" value={form.description} onChange={handleChange} required style={{ width: "100%" }} />
        </label>
        <br /><br />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button type="button" onClick={onClose} style={{ padding: "6px 14px", borderRadius: 5, background: "#eee" }}>Cancelar</button>
          <button type="submit" style={{ padding: "6px 20px", borderRadius: 5, background: "#669955", color: "#fff", fontWeight: 600 }}>
            {product ? "Guardar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}
