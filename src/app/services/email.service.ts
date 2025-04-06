import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import emailjs from '@emailjs/browser';

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  toEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly SERVICE_ID = 'service_eehfuuq'; // Obtenido de EmailJS
  private readonly TEMPLATE_ID = 'template_mupevyz'; // Obtenido de EmailJS
  private readonly USER_ID = 'aSnQuHI4scHfZhKwj'; // Obtenido de EmailJS
  
  constructor() {
    // Inicializar EmailJS (ideal hacerlo en el AppComponent o AppModule)
    emailjs.init(this.USER_ID);
  }

  /**
   * Envía un correo electrónico utilizando EmailJS
   * @param data Datos del formulario y destinatario
   * @returns Observable con la respuesta de EmailJS
   */
  sendEmail(data: EmailData): Observable<any> {
    const templateParams = {
      to_email: data.toEmail,
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      subject: data.subject,
      message: data.message
    };

    // Convertir la promesa de EmailJS en un Observable
    return from(emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams));
  }
}