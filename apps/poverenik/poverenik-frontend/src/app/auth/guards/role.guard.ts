import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtService } from 'src/app/core/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtService: JwtService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string = route.data.expectedRoles;
    const token = this.jwtService.getToken();
    const jwt: JwtHelperService = new JwtHelperService();
    if (!token) {
      this.router.navigate(['/prijava']);
      return false;
    }
    const info = jwt.decodeToken(token.accessToken);
    const roles: string[] = expectedRoles.split('|', 2);
    if (roles.indexOf(info.role) === -1) {
      if (info.role === 'gradjanin') {
        this.router.navigate(['/moji-dokumenti']);
      }
      if (info.role === 'poverenik') {
        this.router.navigate(['/pregled-dokumenata']);
      }
      return false;
    }
    return true;
  }

}
