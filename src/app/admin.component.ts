import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface ServiceModel {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  alt?: string;
  slug?: string;
  onSale?: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  services: ServiceModel[] = [];
  url = '/data/services.json';

  // form model for creating/editing
  showForm = false;
  formModel: Partial<ServiceModel> = {};
  editingIndex: number | null = null;

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<any>(this.url).subscribe(r => {
      this.services = Array.isArray(r) ? r : (r && Array.isArray(r.services) ? r.services : []);
    });
  }

  addNew() {
    this.showForm = true;
    this.editingIndex = null;
    this.formModel = { id: 'new-' + Date.now(), title: '', description: '', price: 0, currency: 'USD' };
  }

  edit(i: number) {
    this.editingIndex = i;
    this.formModel = { ...this.services[i] };
    this.showForm = true;
  }

  save() {
    if (this.editingIndex === null) {
      this.services.push(this.formModel as ServiceModel);
    } else {
      this.services[this.editingIndex] = this.formModel as ServiceModel;
    }
    this.showForm = false;
    this.editingIndex = null;
  }

  delete(i: number) {
    const svc = this.services[i];
    if (!svc) return;
    if (confirm(`Borrar servicio "${svc.title}"? Esta acción eliminará el registro en la sesión actual.`)) {
      this.services.splice(i, 1);
    }
  }

  handleFileInput(event: Event) {
    // Upload to public/user-image is not implemented in this demo.
    // We can read the selected file locally and set a temporary URL if desired.
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      const file = input.files[0];
      const url = URL.createObjectURL(file);
      // set temporary image path for preview/storage in memory
      this.formModel.image = url;
    }
  }

  downloadJSON() {
    const blob = new Blob([JSON.stringify(this.services, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'services.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}
