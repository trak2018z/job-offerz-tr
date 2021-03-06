import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Credentials} from "../../models/login/credentials";
import {Observable, BehaviorSubject} from "rxjs";
import 'rxjs/add/operator/map'
import {AppConsts} from "../../utils/app-consts";
import {JwtHelper} from "angular2-jwt";
import {User} from "../../models/user";
import {Authorities} from "../../utils/authorities-consts";

@Injectable()
export class AuthenticationService {

  private token: string;
  private user: BehaviorSubject<User>;

  constructor(private http: Http, private jwtHelper: JwtHelper) {
    this.user = new BehaviorSubject<User>(new User());
    this.resolveTokenInStorage();
  }

  public authenticate(credentials: Credentials): Observable<boolean> {
    return this.http.post('/authenticate', credentials)
      .map((resp: Response) => {
        const grantedToken = resp.json().token;
        if (grantedToken) {
          this.token = grantedToken;
          localStorage.setItem(AppConsts.TOKEN_STORAGE_KEY, this.token);
          this.nextUserFromToken();
          return true;
        } else {
          return false;
        }
      });
  }

  private resolveTokenInStorage() {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.token = token;
      this.nextUserFromToken();
    } else this.removeToken();
  }

  public logout(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return this.http.get('/logout')
          .map((resp: Response) => {
            this.removeToken();
            return resp.json().success;
          }).catch(err => {
            this.removeToken();
            return Observable.throw(err);
          });
      } else this.removeToken();
    }

    return Observable.of(true);
  }

  public removeToken() {
    this.token = null;
    localStorage.removeItem(AppConsts.TOKEN_STORAGE_KEY);
  }

  private nextUserFromToken() {
    const token = this.getToken();
    const user: User = this.jwtHelper.decodeToken(token).user;
    if (token) this.user.next(user);
  }

  public nextUser(user: User) {
    this.user.next(user);
  }

  public getToken(): string {
    return this.token ? this.token : localStorage.getItem(AppConsts.TOKEN_STORAGE_KEY);
  }

  public isUserLogged(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  public hasUserAdminAuthority(): boolean {
    const token = this.getToken();
    if (token) {
      const user: User = this.jwtHelper.decodeToken(token).user;
      return (user && user.authority === Authorities.ROLE_ADMIN);
    } else return false;
  }

  public getLoggedUser(): Observable<User> {
    return this.user.asObservable();
  }

}
