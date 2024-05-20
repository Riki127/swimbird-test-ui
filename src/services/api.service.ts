import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserBalance } from "../models/user.model";


@Injectable({
    providedIn: 'root',
  })
export class ApiService{
    constructor(private http: HttpClient) {}
    
    apiUrl: string = "https://private-9b37c2-wlb.apiary-mock.com/accounts?ccy=SEK"

    public getTableData(): Observable<UserBalance[]> {
        return this.http.get<UserBalance[]>(this.apiUrl)
    }
}