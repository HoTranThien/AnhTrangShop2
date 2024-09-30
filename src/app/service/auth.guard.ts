import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate{

// constructor(private tokenService:TokenService, private router:Router) { }
// async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//   let role = await this.tokenService.getRole();
//   if(role.toUpperCase() === "ADMIN") return true;
//   else{
//     this.router.navigateByUrl('/access-denied');
//     return false;
//   } 
// }

// }

export const authGuard:CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tokenService = inject(TokenService);  // Inject the AuthService
  const router = inject(Router);  // Inject the Router
  const role = (await tokenService.getRole()).toUpperCase();
  if (role === "ADMIN") {
    return true;
  } else {
    router.navigate(['/access-denied']);
    return false;
  }
};
