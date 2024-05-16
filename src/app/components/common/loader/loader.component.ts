import { Component, Input } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if((loaderService.isLoading | async) != 0){
      <div class="absolute w-full h-full z-20 flex items-center justify-center bg-white">
        <div class="animate-pulse">
          <img src="assets/Home/PLAZARELLA.png" alt="">
        </div>
      </div>
    }
  `
})
export class LoaderComponent {
  @Input() show: boolean = false;
  constructor (public loaderService: LoaderService) { }
}
