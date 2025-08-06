import { Injectable, inject } from '@angular/core';
import { SessionVaultService } from './session-vault.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private sessionVault = inject(SessionVaultService);

  async isAuthenticated(): Promise<boolean> {
    const session = await this.sessionVault.getSession();
    return !!session;
  }

  async login(): Promise<void> {
    await this.sessionVault.storeSession({
      email: 'test@ionic.io',
      firstName: 'Tessa',
      lastName: 'Testsmith',
      accessToken: '4abf1d79-143c-4b89-b478-19607eb5ce97',
      refreshToken: '565111b6-66c3-4527-9238-6ea2cc017126',
    });
    await this.sessionVault.updateUnlockMode('BiometricsWithPasscode');
  }

  async logout(): Promise<void> {
    await this.sessionVault.clearSession();
    await this.sessionVault.updateUnlockMode('InMemory');
  }
}
