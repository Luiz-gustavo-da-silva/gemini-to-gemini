import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  geminiFirst(prompt: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    return this.http.post(url, body, { headers });
  }

  geminiSecond(prompt: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    return this.http.post(url, body, { headers });
  }
}
