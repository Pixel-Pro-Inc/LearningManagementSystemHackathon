import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private shared: SharedService) { }

  processPayment(model: any){
    this.shared.busyService.busy('Processing payment...');
    this.shared.http.post(this.shared.baseUrl + 'payment/process', model).subscribe(
      response =>{
        this.shared.busyService.idle();
        this.shared.toastr.success('Payment made successfully');
        
        //this.shared.router.navigateByUrl('/'); Go back to fufilment page
        window.open('https://localhost:4200/thankyou');
      },
      error => {
        this.shared.busyService.idle();
        this.shared.toastr.error('Something wen\'t wrong');
      }
    );
  }
  transfer(model: any){
    this.shared.busyService.busy('Processing transfer...');
    this.shared.http.get(this.shared.baseUrl + 'payment/transfer').subscribe(
      response =>{
        this.shared.busyService.idle();
        this.shared.toastr.success('Transfer made successfully');
        
        this.shared.router.navigateByUrl('/');
      },
      error => {
        this.shared.busyService.idle();
        this.shared.toastr.error('Something wen\'t wrong');
      }
    );
  }
  refund(model:any){
    this.shared.busyService.busy('Processing refund...');
    this.shared.http.post(this.shared.baseUrl + 'payment/refund', model).subscribe(
      response =>{
        this.shared.busyService.idle();
        this.shared.toastr.success('Refund made successfully');
        
        this.shared.router.navigateByUrl('/');
      },
      error => {
        this.shared.busyService.idle();
        this.shared.toastr.error('Something wen\'t wrong');
      }
    );
  }
}
