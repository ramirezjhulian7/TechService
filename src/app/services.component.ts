import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  cards: ServiceCard[] = [];
  private url = '/data/services.json';

  constructor(private http: HttpClient) {
    this.http.get<any>(this.url).subscribe(
      r => {
        // support either a root array or an object with `services` key
        if (Array.isArray(r)) {
          this.cards = r as ServiceCard[];
        } else if (r && Array.isArray(r.services)) {
          this.cards = r.services as ServiceCard[];
        } else {
          this.cards = [];
        }
      },
      () => this.cards = []
    );
  }
}
