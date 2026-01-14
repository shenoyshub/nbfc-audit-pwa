import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nbfc-audit-pwa');
  // Holds the browser prompt event
  deferredPrompt: any = null;
  showInstallButton = signal(false);

  constructor(private softwareUpdate: SwUpdate) {
    if (softwareUpdate.isEnabled) {
      softwareUpdate.versionUpdates.subscribe(event => {
        console.log('SW EVENT:', event);
      });
    }
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault(); // Prevent default mini-infobar
      this.deferredPrompt = e;
      this.showInstallButton.set(true);
    });
  }

  async installApp() {
    if (!this.deferredPrompt) return;

    // Show browser install prompt
    this.deferredPrompt.prompt();
    const choiceResult = await this.deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear prompt
    this.deferredPrompt = null;
    this.showInstallButton.set(false);
  }
}
