import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-banner',
  standalone: true,
  imports: [],
  template: `
  <div class="w-full d-flex justify-center items-start bg-generic-banner bg-cover bg-center">
    <div class="p-16 flex flex-col lg:items-start items-center justify-center h-full w-full bg-black/50">
        <h3 class="text-[#d4a237] lg:text-3xl text-xl lg:text-left text-center"><b>¡Vive la experiencia única en Plazarella!</b></h3>
        <h1 class="text-white lg:text-8xl text-4xl lg:text-left text-center"><b>{{title}}</b></h1>
    </div>
  </div>
  `, 
  styleUrl: './generic-banner.component.css'
})
export class GenericBannerComponent {
  @Input() title: string;
}
