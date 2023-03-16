import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrcidService {

  private prefix = 'http://127.0.0.1/metabiblioteca_zea/public/api/orcid';

  constructor(
    private http: HttpClient,
  ) { }

  getOrcids()
  {
    let url = `${this.prefix}/list`;

    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getOrcid(id: string)
  {
    let url = `${this.prefix}/${id}`;

    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createOrcid(orcid: any)
  {
    let url = `${this.prefix}/create/${orcid}`;

    console.log(url)

    return this.http.post<any>(url, [''])
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteOrcid(id: string)
  {
    let url = `${this.prefix}/delete/${id}`;

    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPage(link: string)
  {
    return this.http.get<any>(link)
      .pipe(
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse)
  {
    if (error.status === 0)
    {
      // Error del lado del cliente o de red.
      console.error('Ocurrio un error:\n\t', error.error);
    }
    else
    {
      // El backend retorna un código de respuesta no exitoso.
      console.error(`El Backend retorno el código ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Algo malo paso, por favor intente de nuevo más tarde.'));
  }
}