import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ServiceCard {
  id: string;
  title: string;
  description?: string;
  price?: number;
  currency?: string;
  image?: string;
  alt?: string;
  slug?: string;
}

@Component({
  selector: 'app-services-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.scss']
})
export class ServicesDetailComponent {
  service: ServiceCard | null = null;
  private url = '/data/services.json';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(this.url).subscribe(r => {
      const list: ServiceCard[] = Array.isArray(r) ? r : (r && Array.isArray(r.services) ? r.services : []);
      this.service = list.find(s => s.id === id) || null;
    });
  }

  goBack() {
    try { window.history.back(); } catch { /* ignore */ }
  }
}
