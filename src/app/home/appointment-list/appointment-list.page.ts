import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { ToastController } from '@ionic/angular';
import { pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.page.html',
  styleUrls: ['./appointment-list.page.scss'],
})
export class AppointmentListPage implements OnInit {
  appointments: any;
  private successMsg: string;
  private errorMsg: string;

  constructor(
    private appointmentService: AppointmentService,
    private toastController: ToastController,
    private splashScreen: SplashScreen
    ) {}

  ngOnInit() {
    // this.appointmentService.getAppointments().subscribe((appointments) => {
    //   console.log(appointments);
    //   this.appointments = appointments;
    //   this.appointments.sort((a, b) =>
    //     a.appointmentDate.localeCompare(b.appointmentDate)
    //   );
    // });
    // this.splashScreen.show();
  }

  ionViewWillEnter() {
    this.appointmentService.getAppointments().subscribe((appointments) => {
      console.log(appointments);
      this.appointments = appointments;
      this.appointments.sort((a, b) =>
        a.appointmentDate.localeCompare(b.appointmentDate)
      );
      // this.splashScreen.hide();
      // this.appointments.forEach((appointment) => {
      //   appointment.appointmentDate = new Date(Date.parse(appointment.appointmentDate)).toLocaleDateString();
      // });
    });
  }

  async presentToast(appointment) {
    const toast = await this.toastController.create({
      message: `Email: ${appointment.email}`,
      duration: 2000,
    });
    toast.present();
  }


  // Cancel appointment
  cancelAppointment(id){
    this.appointmentService
      .cancelAppointment(id)
      .pipe(mergeMap(() => this.appointmentService.getAppointments()))
      .subscribe(
        async (appointments) => {
          this.appointments = appointments;
          this.appointments.sort((a, b) =>
            a.appointmentDate.localeCompare(b.appointmentDate)
          );
          this.successMsg = 'Successfully cancelled appointment.';
          // Toast the successMsg
          const toast = await this.toastController.create({
            message: this.successMsg,
            duration: 2000,
          });
          toast.present();
        },
        async (error) => {
          // this.errorMsg = (error.status == 404 || error.status == 0) ? error.message : error.error.message;
          this.errorMsg = (error.status == 404 || error.status == 0) ? 'Connection failed to server!' : error.error.message;
          console.log(error);
          // Toast the errorMsg
          const toast = await this.toastController.create({
            message: this.errorMsg,
            duration: 2000,
          });
          toast.present();
        }
      );

  }
}
