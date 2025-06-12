// dashboard/src/components/ProductForm.js
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ProductForm({ product, onClose }) {
  const [form, setForm] = useState(product || { name: "", price: "", description: "", image: "" });
  const API = "/api/products";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = product ? "PUT" : "POST";
    const url = product ? `${API}/${product.id}` : API;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      Swal.fire("¡Listo!", product ? "Producto actualizado" : "Producto agregado", "success");
      onClose();
    } else {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  return (
    <div className="modal">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h2>{product ? "Editar Producto" : "Agregar Producto"}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <button type="submit">Guardar</button>
        <button type="button" className="danger" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
}
