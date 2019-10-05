import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad{

  constructor(public authService: AuthService) { }

  // Tiene que emitir un boolean
  canActivate(){
    return this.authService.isAuth();
  }

  // Tiene que emitir un boolean
  canLoad() {
    return this.authService.isAuth().pipe(
      take(1)
    );
  }
}
