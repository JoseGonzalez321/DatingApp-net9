import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../_services/busy.service';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService); // Assuming BusyService is provided in the root injector

  busyService.busy();

  return next(req).pipe(
    delay(500), // Simulate a delay of 500 milliseconds
    finalize(() => {
      busyService.idle();
    })
  );
};
