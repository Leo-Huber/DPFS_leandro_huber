import React, { useState } from "react";
import Swal from "sweetalert2";

export default function UserForm({ user, onClose }) {
  const [form, setForm] = useState(user || { firstName: "", lastName: "", email: "" });
  const API = "/api/users";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = user ? "PUT" : "POST";
    const url = user ? `${API}/${user.id}` : API;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      Swal.fire("¡Listo!", user ? "Usuario actualizado" : "Usuario agregado", "success");
      onClose();
    } else {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  return (
    <div className="modal">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h2>{user ? "Editar Usuario" : "Agregar Usuario"}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={form.lastName}
          onChange={e => setForm({ ...form, lastName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">Guardar</button>
        <button type="button" className="danger" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
}
