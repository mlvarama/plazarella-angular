import { Component, OnInit } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { PromosService } from '../../core/services/promos.service';
import { Observable, map } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { ActivePromo } from '../../interfaces/promos';
import { GaleryFrameComponent } from '../../components/galery/galery-frame/galery-frame.component';
import { GaleryFrame, LightBoxItem } from '../../interfaces/galery';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { MetadataService } from '../../core/services/meta-tags-manager.service';

@Component({
  selector: 'app-promos',
  standalone: true,
  imports: [BodyModule, GaleryFrameComponent, LightboxModule],
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.css'
})
export class PromosComponent implements OnInit{

  promosResults$!: Observable<GeneralResponse<ActivePromo[]>>;
  lightBoxAlbum: any[] = [];
  promosFrames: GaleryFrame [] = [];

  constructor(private service: PromosService, private lightBox: Lightbox, private metaData: MetadataService){}

  ngOnInit(): void {
    this.promosResults$ = this.service.getActivePromos().pipe(map(
      value => {
        value.data.forEach(item =>{
          const lightBoxItem: LightBoxItem = {
            src: item.image,
            caption: item.name,
          }

          this.lightBoxAlbum.push(lightBoxItem);

          const galeryFrame: GaleryFrame = {
            photo: item.image,
            photoName: item.name
          }
          this.promosFrames.push(galeryFrame);
        })
        return value;
      }
    ));

    this.metaData.updateMetadata({
      title: 'Promociones'
    })
  }

  open(index):void {
    this.lightBox.open(this.lightBoxAlbum, index);
  }

  close(): void{
    this.lightBox.close();
  }
}
