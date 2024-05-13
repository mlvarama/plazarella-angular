import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { GaleryService } from '../../core/services/galery.service';
import { Observable, map } from 'rxjs';
import { GaleryFrame } from '../../interfaces/galery';
import { GeneralResponse } from '../../interfaces/common';
import { GaleryFrameComponent } from '../../components/galery/galery-frame/galery-frame.component';
import { BodyModule } from '../../common/body/body.module';
import { MetadataService } from '../../core/services/meta-tags-manager.service';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [AsyncPipe, GaleryFrameComponent, BodyModule],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.css'
})
export class GaleryComponent implements OnInit{

  galeryResults$!: Observable<GeneralResponse<GaleryFrame[]>>;

  constructor (private service: GaleryService, private metaData: MetadataService){}

  ngOnInit(): void {
    this.galeryResults$ = this.service.getGaleryList();

    this.metaData.updateMetadata({
      title: 'Galería'
    })
  }

}
