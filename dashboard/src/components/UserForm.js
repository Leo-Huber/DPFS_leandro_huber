import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function UserForm({ user, onClose }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => { if (user) setForm(user); }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }
    const method = user ? "PUT" : "POST";
    const url = user ? `/api/users/${user.id}` : "/api/users";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      Swal.fire("¡Guardado!", "El usuario se guardó correctamente.", "success");
      onClose();
    } else {
      Swal.fire("Error", "No se pudo guardar el usuario.", "error");
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(30,40,50,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000
    }}>
      <form style={{
        background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 2px 16px #2222", minWidth: 320
      }} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 16 }}>{user ? "Editar" : "Agregar"} Usuario</h2>
        <label>
          Nombre:<br />
          <input name="firstName" value={form.firstName} onChange={handleChange} required style={{ width: "100%" }} />
        </label>
        <br /><br />
        <label>
          Apellido:<br />
          <input name="lastName" value={form.lastName} onChange={handleChange} required style={{ width: "100%" }} />
        </label>
        <br /><br />
        <label>
          Email:<br />
          <input name="email" value={form.email} onChange={handleChange} required type="email" style={{ width: "100%" }} />
        </label>
        <br /><br />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button type="button" onClick={onClose} style={{ padding: "6px 14px", borderRadius: 5, background: "#eee" }}>Cancelar</button>
          <button type="submit" style={{ padding: "6px 20px", borderRadius: 5, background: "#669955", color: "#fff", fontWeight: 600 }}>
            {user ? "Guardar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}
