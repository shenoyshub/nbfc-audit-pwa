import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class SoftwareUpdateService {

 constructor(private updates: SwUpdate) {
    if (updates.isEnabled) {
      updates.versionUpdates.subscribe(() => {
        if (confirm('New version available. Reload now?')) {
          location.reload();
        }
      });
    }
  }

}
