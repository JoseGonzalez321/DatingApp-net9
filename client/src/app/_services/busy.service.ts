import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestsCount = 0;
  private spinnerService = inject(NgxSpinnerService);

  busy() {
    this.busyRequestsCount++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255, 255, 255, 0.7)',
      color: '#333333',
    });
  }

  idle() {
    this.busyRequestsCount--;
    if (this.busyRequestsCount <= 0) {
      this.busyRequestsCount = 0; // Reset to zero to avoid negative count
      this.spinnerService.hide();
    }
  }
}
