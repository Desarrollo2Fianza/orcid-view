import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrcidService {

  private prefix = 'http://172.16.10.193/metabiblioteca_zea/public/api/orcid';
  // private prefix = '/api/orcid';

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

  createOrcid(orcid: any)
  {
    let url = `${this.prefix}/create/${orcid}`;

    return this.http.post<any>(url, [''])
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
