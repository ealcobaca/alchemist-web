import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})

export class DashService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getConfig() {
    return this.http.get<string>('http://127.0.0.1:8050/');
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }

  getTextFile(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, {responseType: 'text'})
      .pipe(tap(data => this.log(filename, data), error => this.logError(filename, error)));
  }

  private log(filename: string, data: string) {
    const message = `DownloaderService downloaded "${filename}" and got "${data}".`;
    this.messageService.add(message);
  }

  private logError(filename: string, error: any) {
    const message = `DownloaderService failed to download "${filename}"; got error "${error.message}".`;
    console.error(message);
    this.messageService.add(message);
  }

}
