import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {

  private apiUrl = `http://localhost:8089/examen/carpools/`; // URL correcte

  constructor(private http: HttpClient) { }

  // Créer un covoiturage entre utilisateurs
  createCarpool(carpoolData: any, simpleUserId: number, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}add/${simpleUserId}`;
    return this.http.post(url, carpoolData, { headers, responseType: 'text' as 'json' });
  }
  
  
  // Récupérer tous les covoiturages d'un utilisateur spécifique
  getCarpoolsForUser(simpleUserId: number, headers: HttpHeaders): Observable<any[]> {
    const url = `${this.apiUrl}getCarpoolsForUser/${simpleUserId}`;
    return this.http.get<any[]>(url, { headers });
  }

  // Supprimer un covoiturage par son ID
  deleteCarpool(carpoolId: number,offerId: number,headers: HttpHeaders): Observable<void> {
    const url = `${this.apiUrl}delete/${carpoolId}/${offerId}`;
    return this.http.delete<void>(url, { headers });
  }

  getAllCarpools(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.error("❌ Aucun token trouvé !");
      return new Observable(observer => {
        observer.error("No authentication token found");
        observer.complete();
      });
    }
  
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  
    console.log("🔍 Headers envoyés:", headers); // Vérifie les headers
    
    const url = `${this.apiUrl}get`;
    return this.http.get<any[]>(url, { headers }).pipe(
      tap((data) => console.log("📥 Réponse API - Tous les Carpools:", data))
    );
  }
  
  
  

  // Rejoindre un covoiturage
  joinCarpool(carpoolId: number, simpleUserId: number, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}join/${carpoolId}/${simpleUserId}`;
    return this.http.post<any>(url, {}, { headers });
  }

  // Ajout d'une méthode pour récupérer les futurs covoiturages
getFutureCarpools(): Observable<any[]> {
  const token = localStorage.getItem('authToken');

  if (!token) {
    console.error("❌ Aucun token trouvé !");
    return new Observable(observer => {
      observer.error("No authentication token found");
      observer.complete();
    });
  }

  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json');

  console.log("🔍 Headers envoyés:", headers);

  const url = `${this.apiUrl}future`;
  return this.http.get<any[]>(url, { headers }).pipe(
    tap((data) => console.log("📥 Réponse API - Futurs Carpools:", data))
  );
}

getCarpoolById(carpoolId: number, headers: HttpHeaders): Observable<any> {
  const url = `${this.apiUrl}get/${carpoolId}`; // Utilisez `this.apiUrl`
  return this.http.get(url, { headers });
}
getCarpoolOfferer(carpoolId: number, headers: HttpHeaders): Observable<any> {
  const url = `${this.apiUrl}${carpoolId}/offreur`;
  return this.http.get<any>(url, { headers });
}

getCarpoolsByUser(userId: number, headers: HttpHeaders): Observable<any> {
  const url = `${this.apiUrl}user/${userId}`;
  return this.http.get<any>(url, { headers });
}

leaveCarpool(carpoolId: number, userId: number,headers: HttpHeaders): Observable<void> {
  const url = `${this.apiUrl}leave/${carpoolId}/${userId}`;
  return this.http.delete<void>(url,{headers});
}
  // Mettre à jour un covoiturage (seulement si personne ne l'a rejoint)
  updateCarpool(carpoolId: number, userId: number, carpoolData: any, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}update/${carpoolId}/${userId}`;
    return this.http.put(url, carpoolData, { headers }).pipe(
      catchError(error => {
        console.error("Update carpool failed", error);
        return throwError(() => error);
      })
    );
  }

  getUsersWhoJoinedCarpool(carpoolId: number, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}${carpoolId}/users`;
    return this.http.get<any>(url, { headers }).pipe(
      tap((data) => console.log("📥 Réponse API - Utilisateurs ayant rejoint le covoiturage:", data)),
      catchError(error => {
        console.error("Erreur lors de la récupération des utilisateurs ayant rejoint le covoiturage", error);
        return throwError(() => error);
      })
    );
  }



// Ajoutez cette méthode dans la classe CarpoolService
getCarpoolsJoinedByUser(userId: number, headers: HttpHeaders): Observable<any[]> {
  const url = `${this.apiUrl}joined/${userId}`; // Endpoint pour récupérer les covoiturages rejoints
  return this.http.get<any[]>(url, { headers }).pipe(
    tap((data) => console.log("📥 Réponse API - Covoiturages rejoints par l'utilisateur:", data)),
    catchError(error => {
      console.error("Erreur lors de la récupération des covoiturages rejoints par l'utilisateur", error);
      return throwError(() => error);
    })
  );
}


}
