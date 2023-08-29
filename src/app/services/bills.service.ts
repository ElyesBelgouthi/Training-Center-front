import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../shared/bill.model';

@Injectable({ providedIn: 'root' })
export class BillsService {
  baseURL: string = `http://localhost:3000/bill`;

  constructor(private http: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.baseURL);
  }

  getBillById(id: string): Observable<Bill> {
    return this.http.get<Bill>(this.baseURL + '/' + id);
  }

  updateBill(id: string, newData: any): void {
    this.http.patch(this.baseURL + '/' + id, newData).subscribe();
  }

  addBill(newData: any): void {
    this.http.post<Bill>(this.baseURL, newData).subscribe((bill: Bill) => {});
  }

  deleteBill(id: number): void {
    this.http.delete(this.baseURL + '/' + id).subscribe();
  }
}
