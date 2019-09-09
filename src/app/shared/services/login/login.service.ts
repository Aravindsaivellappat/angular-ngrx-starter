import { Injectable } from '@angular/core';
import { Principal } from '../../auth/principal.service';
import { AuthServiceProvider } from '../../auth/auth-jwt.service';
import { Router } from '@angular/router';
import { Credentials } from '../../dto/credentials.model';

@Injectable()
export class LoginService {
    constructor(
        private principal: Principal,
        private authServiceProvider: AuthServiceProvider,
        private router: Router
    ) {}

    login(credential: Credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServiceProvider.login(credential).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        resolve(data);
                    });
                    return cb;
                },
                err => {
                    this.authServiceProvider.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServiceProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServiceProvider.logout().subscribe();
        this.principal.authenticate(null);
        this.router.navigate(['login']);
    }
}
