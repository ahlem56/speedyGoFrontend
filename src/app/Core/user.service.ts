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
  private apiUrl = 'http://localhost:8089/examen/user';

  constructor(private http: HttpClient) { }

  // Login method to authenticate user and get JWT token
  login(email: string, password: string): Observable<any> {
    const loginData = { email: email, password: password };

    return this.http.post(this.signinUrl, loginData).pipe(
      map((response: any) => {
        console.log('Response from server:', response);  // Log the response
        const token = response.token.split(' ')[1];  // Extract the token
        
        // Store the token
        localStorage.setItem('authToken', token);
        
        // Normalize role to match route definitions (Admin, SimpleUser, Driver, Partner)
        let normalizedRole = response.role;
        if (normalizedRole) {
          // Convert to title case (first letter uppercase, rest lowercase)
          normalizedRole = normalizedRole.charAt(0).toUpperCase() + 
                           normalizedRole.slice(1).toLowerCase();
          
          // Special case for SimpleUser
          if (normalizedRole.toLowerCase() === 'simpleuser') {
            normalizedRole = 'SimpleUser';
          }
        }
        
        // Store the normalized role
        localStorage.setItem('userRole', normalizedRole);
        localStorage.setItem('user', JSON.stringify(response.user));

        return { token, role: normalizedRole, user: response.user };
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

  // user.service.ts
logout(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('user');
}


// API call to upload profile photo
uploadProfileImage(formData: FormData, headers: HttpHeaders): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/upload-profile-photo`, formData, { headers });
}

updateUserProfile(user: any, headers: HttpHeaders): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/update-profile`, user, { headers });
}


sendSOS() {
  const phoneNumber = '50695322';  // Replace with actual phone number
  const carrierGateway = 'vtext.com'; // Replace with the actual carrier gateway
  const message = 'SOS Alert! My location is: https://www.google.com/maps?q=LAT,LONG'; // You can dynamically set latitude and longitude

  // Retrieve the user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Make sure the user exists
  if (user && user.id) {
    // Correcting to use POST request instead of GET
    this.http.post(`http://localhost:8089/examen/sos/sendSos`, {
      phoneNumber: phoneNumber,
      carrierGateway: carrierGateway,
      message: message,
      userId: user.id  // Use user.id from localStorage
    }).subscribe(response => {
      console.log('SOS sent:', response);
    }, error => {
      console.log('Error sending SOS:', error);
    });
  } else {
    console.log('User not found');
  }
}



}
