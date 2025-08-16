import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Records.css";
import { getRecords, postAttendance } from "../services/api";

export default function Records() {
  const [records, setRecords] = useState<any[]>([]);
  const history = useHistory();
  const recordId = localStorage.getItem("RECORD");

  // Verifica si el usuario está logueado antes de mostrar los registros
  useEffect(() => {
    if (!recordId) {
      // Si no está logueado, redirige al login
      history.push("/login");
    } else {
      fetchRecords(); // Si está logueado, obtener los registros
    }
  }, [history, recordId]);

  const fetchRecords = async () => {
    try {
      const { data } = await getRecords(recordId);
      setRecords(data);
    } catch (err) {
      console.error(err);
      alert("Error al obtener registros");
    }
  };

  const handleAttendance = async () => {
    try {
      const { data } = await postAttendance(recordId, recordId);
      alert(data.message);
      fetchRecords();
    } catch (err) {
      console.error(err);
      alert("Error al registrar asistencia");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.href = "/records"; 
  };

  const mainDate = records.length > 0 ? records[0].date : "-";
  const mainTime = records.length > 0 ? records[0].time : "-";

  function formatRecordDate(dateStr: string, timeStr: string) {
    if (!dateStr) return "-";
    const dateObj = new Date(dateStr + 'T' + (timeStr || '00:00:00'));
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const diaSemana = dias[dateObj.getDay()];
    const dia = dateObj.getDate();
    const mes = meses[dateObj.getMonth()];
    const año = dateObj.getFullYear();
    const hora = timeStr ? timeStr.slice(0, 5) : "";
    return hora
      ? `${diaSemana}, ${dia} ${mes} ${año} ${hora}`
      : `${diaSemana}, ${dia} ${mes} ${año}`;
  }

  return (
    <IonPage>
      <IonHeader>
        <div>
          <IonButton
            className="logout-btn-container"
            fill="solid"
            color="none"
            onClick={handleLogout}
          >
            Cerrar sesión
          </IonButton>
        </div>
        <div className="records-logo-container">
          <img src="/src/assets/logotec.png" alt="Logo" className="records-logo" />
        </div>
        <IonToolbar color="primary">
          <div className="welcome-header">
            <span className="welcome-title">Bienvenido</span>
            <span className="welcome-user">{localStorage.getItem("NAME") || "Usuario"} {localStorage.getItem("LASTNAME") || ""}</span>
          </div>
        </IonToolbar>
        <IonToolbar>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <IonButton className="btn-attendance" expand="block" onClick={handleAttendance}>
              Registrar Asistencia
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding records-content">
        <IonList>
          {records.length === 0 ? (
            <IonText className="no-records">No hay registros disponibles.</IonText>
          ) : (
            [...records].reverse().map((r: any) => (
              <IonItem key={r.record}>
                <div className="record-row">
                  <div className="record-col record-date">{formatRecordDate(r.date, "")}</div>
                  <div className="record-col record-time">{r.time}</div>
                </div>
              </IonItem>
            ))
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
