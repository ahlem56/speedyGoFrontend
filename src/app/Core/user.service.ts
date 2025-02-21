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
 // Login method to authenticate user and get JWT token
login(email: string, password: string): Observable<any> {
  const loginData = { email: email, password: password }; // Remove the 'type' field

  return this.http.post(this.signinUrl, loginData).pipe(
    map((response: any) => {
      const token = response.token.split(' ')[1];  // Extract the token after "Bearer"
      localStorage.setItem('authToken', token);  // Save the token to localStorage

      // Store the user's role if it is returned in response
      localStorage.setItem('userRole', response.role);  // Save the role (or type)

      return { token, role: response.role };  // Return both token and role (or userType)
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
