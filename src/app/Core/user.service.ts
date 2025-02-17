import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private signinUrl = 'http://localhost:8089/examen/user/signin';
  private signupUrl = 'http://localhost:8089/examen/user/signup';

  constructor(private http: HttpClient) { }

  // Login method to authenticate user and get JWT token
  login(email: string, password: string): Observable<any> {
    const loginData = { email: email, password: password };

    // Send the request to the backend
    return this.http.post(this.signinUrl, loginData, { responseType: 'text' }).pipe(
      // Handle the response as plain text
      map((response: string) => {
        // The response should be "Bearer <token>"
        const token = response.split(' ')[1];  // Extract the token after "Bearer"

        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Return the token
        return token;
      })
    );
  }

  // Signup method to register a new user
  signup(signupData: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, signupData).pipe(
      map((response) => {
        // The response from backend is structured and should be processed correctly
        console.log('Response from backend:', response);
        return response;  // Return the response to the component
      })
    );
  }
  
  

  // Get user profile with token
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.apiUrl}/user/profile`, { headers });
  }
}
