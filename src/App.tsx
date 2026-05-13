import { useState, useEffect } from 'react'
import './App.css'

interface Notification {
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
}

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    telefono: '',
    correo: '',
    contraseña: ''
  });

  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000); // 5 seconds is enough for generic messages
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // 1. Basic empty checks
    if (!formData.nombre || !formData.apellido || !formData.correo || !formData.contraseña) {
      return "Todos los campos obligatorios deben ser completados.";
    }

    // 2. Age validation
    const ageValue = parseInt(formData.edad);
    if (isNaN(ageValue) || ageValue <= 0 || ageValue > 120) {
      return "Por favor, ingrese una edad válida (1-120).";
    }

    // 3. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      return "El formato del correo electrónico no es válido.";
    }

    // 4. Phone validation (basic)
    if (formData.telefono.length < 7) {
      return "El número de teléfono debe tener al menos 7 dígitos.";
    }

    // 5. Password validation
    if (formData.contraseña.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }

    return null; // Valid
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setNotification({
        type: 'warning',
        title: 'Validación de Formulario',
        message: validationError
      });
      return;
    }

    // Simulated API Call
    try {
      // In a real scenario, this would be a fetch call.
      // If the "server" failed, we would catch it and show a GENERIC message.
      const isSimulatedServerDown = false; 

      if (isSimulatedServerDown) {
        throw new Error("Ocurrió un error inesperado en el servidor");
      }

      setNotification({
        type: 'success',
        title: 'Registro Exitoso',
        message: 'Su cuenta ha sido creada correctamente.'
      });

      // Reset form
      setFormData({
        nombre: '',
        apellido: '',
        edad: '',
        telefono: '',
        correo: '',
        contraseña: ''
      });

    } catch (error) {
      // CORRECTED: Generic error message that reveals NOTHING about the system.
      setNotification({
        type: 'error',
        title: 'Error del Sistema',
        message: 'No se pudo procesar el registro en este momento. Por favor, intente más tarde.'
      });
    }
  };

  return (
    <>
      <div className="background-glow"></div>
      
      {notification && (
        <div className="notification-container">
          <div className={`notification ${notification.type}`}>
            <button 
              className="notification-close" 
              onClick={() => setNotification(null)}
            >
              ✕
            </button>
            <span className="notification-title">{notification.title}</span>
            <div className="notification-content">
              {notification.message}
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="card">
          <h1>Registro Seguro</h1>
          <p className="subtitle">Sus datos están protegidos con nosotros.</p>
          
          <form onSubmit={handleRegister} noValidate>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Ej. Juan"
                value={formData.nombre}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input 
                type="text" 
                id="apellido" 
                name="apellido" 
                placeholder="Ej. Pérez"
                value={formData.apellido}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="edad">Edad</label>
              <input 
                type="number" 
                id="edad" 
                name="edad" 
                min="1"
                max="120"
                placeholder="Ej. 25"
                value={formData.edad}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input 
                type="tel" 
                id="telefono" 
                name="telefono" 
                placeholder="Ej. 3001234567"
                value={formData.telefono}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo">Correo Electrónico</label>
              <input 
                type="email" 
                id="correo" 
                name="correo" 
                placeholder="juan@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña">Contraseña</label>
              <input 
                type="password" 
                id="contraseña" 
                name="contraseña" 
                placeholder="Mínimo 8 caracteres"
                value={formData.contraseña}
                onChange={handleChange}
                required 
              />
            </div>

            <button type="submit" className="btn-primary">
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
