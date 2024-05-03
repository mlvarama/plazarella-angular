import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-banner',
  standalone: true,
  imports: [],
  template: `
  <div class="w-full d-flex justify-center items-start bg-generic-banner bg-cover bg-center">
    <div class="p-16 flex flex-col items-start justify-center h-full w-full bg-black/50">
        <h3 class="text-[#d4a237] text-3xl"><b>¡Vive la experiencia única en Plazarella!</b></h3>
        <h1 class="text-white text-8xl"><b>{{title}}</b></h1>
    </div>
  </div>
  `, 
  styleUrl: './generic-banner.component.css'
})
export class GenericBannerComponent {
  @Input() title: string;
}
