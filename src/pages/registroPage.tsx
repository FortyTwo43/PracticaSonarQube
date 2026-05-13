import { useState } from "react";
import { authService } from "../service/authService";
import { Notification } from "../components/Notification";
import "../styles/RegistroPage.css";

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    correo: "",
    contrasena: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // VULNERABILIDAD INTENCIONAL: No validamos que edad sea un número
      // Si el usuario escribe texto, Supabase lanzará un error sin procesar
      // que expone información sensible del servidor como:
      // - Nombre de la tabla
      // - Rutas de carpetas del servidor
      // - Información de la base de datos
      const userData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        edad: formData.edad,
        telefono: formData.telefono,
        correo: formData.correo,
        contrasena: formData.contrasena,
      };

      await authService.signUp(userData as any);

      // Si el registro es exitoso
      setNotification({
        message: "✓ Registro exitoso. Bienvenido!",
        type: "success",
      });

      // Limpiar formulario
      setFormData({
        nombre: "",
        apellido: "",
        edad: "",
        telefono: "",
        correo: "",
        contrasena: "",
      });
    } catch (error: any) {
      // VULNERABILIDAD INTENCIONAL: Mostramos el error completo de Supabase
      // sin procesarlo ni sanitizarlo. Esto expone:
      // - Nombre de la tabla (usuario)
      // - Rutas de carpetas internas
      // - Información del servidor
      // - Stack trace completo
      const errorMessage =
        error?.message ||
        "Error en el registro. Por favor, intenta de nuevo.";

      setNotification({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.type === "success" ? 5000 : 10000}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="registro-card">
        <h1>Registro de Usuario</h1>
        <p className="registro-subtitle">
          Complete los campos para crear su cuenta
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">NOMBRE</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">APELLIDO</label>
            <input
              id="apellido"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ej: Pérez"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edad">EDAD</label>
            <input
              id="edad"
              type="text"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              placeholder="Ej: 25"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">TELÉFONO</label>
            <input
              id="telefono"
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: +593978123456"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">CORREO ELECTRÓNICO</label>
            <input
              id="correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ej: usuario@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">CONTRASEÑA</label>
            <input
              id="contrasena"
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="registro-button"
            disabled={loading}
          >
            {loading ? "Registrándose..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}
