import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
    reply_to: ['', Validators.email],
    user_email: ['', Validators.email],
  });

  constructor(private fb: FormBuilder) {}

  async send() {
    if (this.form.valid) {
      emailjs.init('0XpC30yg7gM4VDRSv');

      try {
        // Send email to admin (template_admin)
        let adminResponse = await emailjs.send(
          'service_y83zs3n',
          'template_admin',
          {
            name: this.form.value.name,
            email: this.form.value.email,
            subject: this.form.value.subject,
            message: this.form.value.message,
          }
        );

        // Send email to user (template_user)
        let userResponse = await emailjs.send(
          'service_y83zs3n',
          'template_user',
          {
            name: this.form.value.name,
            email: this.form.value.email,
          }
        );

        // Check both responses and show appropriate alerts
        if (adminResponse && userResponse) {
          alert('Message have been sent!');
          this.form.reset();
        } else {
          alert(
            'An error occurred while sending email. Please try again later.'
          );
        }
      } catch (error) {
        console.error('Error sending emails:', error);
        alert('An error occurred while sending email. Please try again later.');
      }
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
