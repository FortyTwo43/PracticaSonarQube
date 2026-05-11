import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    telefono: '',
    correo: '',
    contraseña: ''
  });

  const [isCrashed, setIsCrashed] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulating the error: if age is not a number, the application "crashes" 
    // and reveals sensitive information in a raw stack trace.
    const ageValue = parseInt(formData.edad);

    if (isNaN(ageValue) && formData.edad !== '') {
      // Reveal sensitive information in the stack trace as per "Caso 2"
      const stackTrace = `
Unhandled Exception: System.NumberFormatException: Input string was not in a correct format.
   at System.Number.ParseInt32(String s, NumberStyles style, NumberFormatInfo info)
   at MyApp.Web.Controllers.RegistrationController.Register(UserDto user) in C:\\inetpub\\wwwroot\\PROD-SERVER-01\\src\\Controllers\\RegistrationController.cs:line 45
   at MyApp.Data.Repositories.UserRepository.Insert(UserEntity entity) in C:\\inetpub\\wwwroot\\PROD-SERVER-01\\src\\Data\\Repositories\\UserRepository.cs:line 128
   
--- Database Context Information ---
Server Name: DB-CLUSTER-NORTH-02.internal.network
Database Instance: MSSQLSERVER_PROD
Target Tables: [Users], [UserCredentials], [UserProfiles], [AuditLogs]
Current Session ID: 4529-AX-9921
Internal Paths: 
  - D:\\Data\\DBFiles\\PROD_USER_DB.mdf
  - E:\\Logs\\DatabaseLogs\\Transaction_Log_01.ldf
  
--- Environment Info ---
OS: Windows Server 2022 Datacenter
Framework: .NET 6.0.12
Runtime Path: C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319
User Context: DOMAIN_PROD\\AppService_User
      `;
      setErrorDetails(stackTrace);
      setIsCrashed(true);
    } else {
      alert('¡Registro exitoso! (Simulado)');
    }
  };

  if (isCrashed) {
    return (
      <div className="error-screen">
        <div className="error-header">
          <div className="error-title">Critical System Error: 0x80070057</div>
          <div>An unhandled exception occurred during the execution of the current web request.</div>
        </div>
        <div className="stack-trace">
          {errorDetails}
        </div>
        <button className="btn-reload" onClick={() => window.location.reload()}>
          Restart Application
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="background-glow"></div>
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
