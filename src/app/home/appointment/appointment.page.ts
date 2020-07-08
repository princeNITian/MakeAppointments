import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  public appointmentDate: string;
  public name: string;
  public email: string;
  private successMsg: string;
  private errorMsg: string;

  constructor(private appointmentService: AppointmentService, private toastController: ToastController) { }

  ngOnInit() {
    this.appointmentDate = '';
    this.name = '';
    this.email = '';
    // const date = new Date();
    // console.log(date);
    // const myDate = new Date(
    //   date.getTime() - date.getTimezoneOffset() * 60000
    // ).toISOString();
    // console.log(myDate);
    // console.log(JSON.stringify(date));
    // const locD = JSON.stringify(date);
    // console.log(locD.slice(0,11)+"T18.30.00.000Z");
    // var dateS = date.toISOString();
    // dateS = dateS.split('T')[0] + 'T18.30.00.000Z';
    // console.log(dateS);
    // console.log(typeof(dateS));
  }

  // ionViewWillLeave() {
  //   const appointmentDate = new Date(this.appointmentDate);
  //   console.log('ionView', appointmentDate);
  // }

  createAppointment() {
    // let dateS = new Date(this.appointmentDate).toISOString();
    // dateS = dateS.split('T')[0] + 'T18.30.00.000Z';
    // // console.log(dateS);
    // // this.appointmentDate = dateS;
    // console.log(dateS);
    // console.log(this.appointmentDate);


    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email).subscribe(async appointment => {
      console.log('success.', appointment);
      this.appointmentDate = '';
      this.name = '';
      this.email = '';
      this.successMsg = 'Successfully Created an appointment';
      const toast = await this.toastController.create({
        message: this.successMsg,
        duration: 2000
      });
      toast.present();
    },
    async error => {
      this.appointmentDate = '';
      this.name = '';
      this.email = '';
      this.errorMsg = (error.status == 400) ? error.error.message : 'Connection failed to server!';
      console.log(error);
      const toast = await this.toastController.create({
        message: `${this.errorMsg}`,
        duration: 2000
      });
      toast.present();
    }
    );
  }

}
