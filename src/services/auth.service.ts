import { API_CONFIG } from './../app/config/api.config';
import { Credenciais } from './../app/models/credenciais';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
  })

  export class AuthService {

    jwtService: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient) {}

    authenticate(creds: Credenciais) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            observe: 'response',
            responseType: 'text'
        })
    }

    successfulLogin(authToken: string) {
        localStorage.setItem('token', authToken);
    }

    isAuthenticated() {
        let token = localStorage.getItem('token')
        if (token != null) {
            return !this.jwtService.isTokenExpired(token);
        }
        return false
    }

    logout() {
        localStorage.clear();
    }
  }