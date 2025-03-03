import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class SettingsComponent {
  darkMode: boolean = false; // Default to false
  notifications: boolean = true;
  name: string = 'John Doe';
  email: string = 'johndoe@example.com';
  newPassword: string = '';
  confirmPassword: string = '';

  saveSettings() {
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Settings saved:', {
      name: this.name,
      email: this.email,
      darkMode: this.darkMode,
      notifications: this.notifications,
    });

    alert('Settings updated successfully!');
    this.toggleDarkMode();
  }

  // Function to apply dark mode styles globally
  toggleDarkMode() {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
}
