import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import {Account, LoginAccount, RegAccount} from '@app/core/models';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<Account>;
  public currentUser: Observable<Account>;

  constructor(private http: HttpClient) {
    const account: Account = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<Account>(account);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Account {
    return this.currentUserSubject.value;
  }

  register(regAccount: RegAccount): Observable<Account> {
    return this.http.post<Account>(`${environment.apiUrl}/accounts/register`, regAccount);
  }

  login(loginAccount: LoginAccount) {
    return this.http.post<Account>(`${environment.apiUrl}/accounts/login`, loginAccount)
      .pipe(map((account: Account) => {
        // login successful if there's a jwt token in the response
        if (account && account.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(account));
          this.currentUserSubject.next(account);
        }
        return account;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  matchRole(allowedRoles: string[]): boolean {
    let isMatch = false;
    allowedRoles.forEach((item: string) => {
      if (this.currentUserValue && item.toUpperCase() === this.currentUserValue.role.toUpperCase()) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
