import { useState, useEffect } from 'react'
import './App.css'

interface Notification {
  type: 'success' | 'error';
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
      }, 10000); // 10 seconds for errors since they contain lots of info
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const ageValue = parseInt(formData.edad);

    if (isNaN(ageValue) && formData.edad !== '') {
      // "Revealing Error" simulation
      const stackTrace = `Error: Invalid numeric input in RegistrationController.cs:line 45
Path: C:\\inetpub\\wwwroot\\PROD-SERVER-01\\src\\Controllers\\RegistrationController.cs
DB Server: DB-CLUSTER-NORTH-02.internal.network
Tables Exposed: [Users], [UserCredentials], [UserProfiles]
Internal Runtime: .NET 6.0.12 (C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319)`;

      setNotification({
        type: 'error',
        title: 'System Exception: FormatException',
        message: stackTrace
      });
    } else {
      setNotification({
        type: 'success',
        title: 'Registro Exitoso',
        message: 'El usuario ha sido registrado correctamente en el sistema.'
      });
      // Clear form on success
      setFormData({
        nombre: '',
        apellido: '',
        edad: '',
        telefono: '',
        correo: '',
        contraseña: ''
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
          <h1>Registro de Usuario</h1>
          <p className="subtitle">Complete los campos para crear su cuenta.</p>
          
          <form onSubmit={handleRegister}>
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
                type="text" 
                id="edad" 
                name="edad" 
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
                placeholder="Ej. +57 300..."
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
                placeholder="••••••••"
                value={formData.contraseña}
                onChange={handleChange}
                required 
              />
            </div>

            <button type="submit" className="btn-primary">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
