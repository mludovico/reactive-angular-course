import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable, shareReplay, tap} from "rxjs";
import {User} from "./user";
import {HttpClient} from "@angular/common/http";

const AUTH_KEY = "auth_data";

@Injectable({
  providedIn: "root"
})
export class AuthStore {
  constructor(
    private http: HttpClient
  ) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const userJson = localStorage.getItem(AUTH_KEY);
    if (userJson) {
      this.subject.next(JSON.parse(userJson));
    }
  }

  private subject = new BehaviorSubject<User>(null);

  user$ = this.subject.asObservable();
  isLoggedIn$ = new Observable<boolean>();
  isLoggedOut$ = new Observable<boolean>();

  login(email: string, password: string): Observable<User> {
    console.log("Called login from store with username: ", email, " and password:", password);
    return this.http.post<User>("/api/login", {email, password})
      .pipe(
        tap(user => {
          this.subject.next(user);
          localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        }),
        shareReplay(),
      );
  }

  logout(): void {
    this.subject.next(null);
    localStorage.removeItem(AUTH_KEY);
  }
}
