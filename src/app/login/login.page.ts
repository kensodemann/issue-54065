import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { AuthenticationService } from '../core/authentication.service';
import { SessionVaultService } from '../core/session-vault.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar],
})
export class LoginPage {
  private navController = inject(NavController);
  private authentication = inject(AuthenticationService);
  private vault = inject(SessionVaultService);

  async login() {
    try {
      await this.authentication.login();
      await this.vault.updateUnlockMode('BiometricsWithPasscode');
      this.navController.navigateRoot(['tabs', 'tab1']);
    } catch (err: unknown) {
      alert(JSON.stringify(err));
    }
  }
}
