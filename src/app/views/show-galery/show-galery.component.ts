import { Component, Input, OnInit, inject } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { GaleryService } from '../../core/services/galery.service';
import { Observable, map } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { GaleryDetail, GaleryFrame, LightBoxItem } from '../../interfaces/galery';
import { GaleryFrameComponent } from '../../components/galery/galery-frame/galery-frame.component';
import { environment } from '../../../environments/environment.development';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { MetadataService } from '../../core/services/meta-tags-manager.service';

@Component({
  selector: 'app-show-galery',
  standalone: true,
  imports: [BodyModule, GaleryFrameComponent, LightboxModule],
  templateUrl: './show-galery.component.html',
  styleUrl: './show-galery.component.css'
})
export class ShowGaleryComponent implements OnInit {

  ENV: string = environment.api;
  galeryResults$!: Observable<GeneralResponse<GaleryDetail>>;
  
  lightBoxAlbum: any[] = [];
  galeryFrames: GaleryFrame [] = [];
  

  constructor(private service: GaleryService, private lightBox: Lightbox, private metaData: MetadataService){}

  @Input() id = ''; 

  ngOnInit(): void{
    this.galeryResults$ = this.service.getGaleryDetailById(Number(this.id)).pipe(map(
      value => {
        this.metaData.updateMetadata({
          title: value.data.galery.name,
          image: this.ENV + value.data.photos[0].image
        })
        
        value.data.photos.forEach(photo => {
          const lightBoxItem: LightBoxItem = {
            src: this.ENV + photo.image,
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
