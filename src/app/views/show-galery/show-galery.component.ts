import { Component, Input, OnInit, inject } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { GaleryService } from '../../core/services/galery.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { GaleryDetail, GaleryFrame, LightBoxItem } from '../../interfaces/galery';
import { GaleryFrameComponent } from '../../components/galery/galery-frame/galery-frame.component';
import { environment } from '../../../environments/environment.development';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-show-galery',
  standalone: true,
  imports: [BodyModule, GaleryFrameComponent, LightboxModule],
  templateUrl: './show-galery.component.html',
  styleUrl: './show-galery.component.css'
})
export class ShowGaleryComponent implements OnInit {


  galeryResults$!: Observable<GeneralResponse<GaleryDetail>>;
  
  lightBoxAlbum: any[] = [];
  galeryFrames: GaleryFrame [] = [];
  

  constructor(private service: GaleryService, private lightBox: Lightbox, private title: Title){}

  @Input() id = ''; 

  ngOnInit(): void{
    this.galeryResults$ = this.service.getGaleryDetailById(Number(this.id)).pipe(map(
      value => {
        
        this.title.setTitle(value.data.galery.name)
        value.data.photos.forEach(photo => {
          if (!photo.image.startsWith(environment.api)){
            photo.image = `${environment.api}${photo.image}`;
          }

          const lightBoxItem: LightBoxItem = {
            src: photo.image,
            caption: photo.name,
          }

          this.lightBoxAlbum.push(lightBoxItem);

          const galeryFrame: GaleryFrame = {
            photo: photo.image,
            photoName: photo.name
          }
          this.galeryFrames.push(galeryFrame);
        })
        return value;
      }
    ));
  }
  
  open(index: number): void{
    this.lightBox.open(this.lightBoxAlbum, index);
  }

  close(): void{
    this.lightBox.close();
  }
}
