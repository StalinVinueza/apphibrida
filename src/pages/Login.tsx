import { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonIcon } from "@ionic/react";
import { personCircle, lockClosed } from 'ionicons/icons';
import { useHistory } from "react-router-dom";
import { loginUser } from "../services/api";
import "./Login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  // 'history' ya no es necesario para la redirección, pero se puede mantener si se usa en otro lugar.
  const history = useHistory(); 

  const handleLogin = async () => {
    try {
      const { data } = await loginUser(user, pass);
      if (data.length > 0) {
        const u = data[0];
        localStorage.setItem("RECORD", u.record);
        localStorage.setItem("ID", u.id);
        localStorage.setItem("NAME", u.names);
        localStorage.setItem("LASTNAME", u.lastnames);

        // --- CAMBIO REALIZADO AQUÍ ---
        // Redirige y refresca la página para que el estado de la sesión se cargue correctamente.
        window.location.href = "/records"; 
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con la API");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <div className="login-box">
          <img src="/src/assets/logotec.png" alt="PUCE TEC" className="login-logo" />

          <div className="input-pill">
            <div className="input-label">
              <IonIcon icon={personCircle} />
            </div>
            <IonInput
              value={user}
              placeholder="Usuario"
              onIonChange={(e) => setUser(e.detail.value!)}
            />
          </div>

          <div className="input-pill">
            <div className="input-label">
              <IonIcon icon={lockClosed} />
            </div>
            <IonInput
              type="password"
              value={pass}
              placeholder="Contraseña"
              onIonChange={(e) => setPass(e.detail.value!)}
            />
          </div>

          <IonButton className="custom-pill" onClick={handleLogin}>Ingresar</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}