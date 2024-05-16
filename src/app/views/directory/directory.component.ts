import { Component, Input, OnInit } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { Observable, map, tap } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { CategoryButtonFrame, DirectoryFrame } from '../../interfaces/directory';
import { DirectoryService } from '../../core/services/directory.service';
import { environment } from '../../../environments/environment';
import { DirectoryFrameComponent } from '../../components/directory/directory-frame/directory-frame.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from '../../core/services/meta-tags-manager.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [BodyModule, DirectoryFrameComponent, FontAwesomeModule],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.css'
})
export class DirectoryComponent implements OnInit {
  diretoryResults$!: Observable<GeneralResponse<DirectoryFrame[]>>;
  categoriesResults$!: Observable<GeneralResponse<CategoryButtonFrame[]>>;
  searchIcon = faMagnifyingGlass;
  @Input() id = '';

  constructor(private service: DirectoryService, private router: Router, private route: ActivatedRoute, private metaData: MetadataService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    this.id = params['id'];
    this.diretoryResults$ = this.service.getDirectorys(Number(this.id) ? Number(this.id) : 0).pipe(
      tap(element => {
        element.data.forEach(item => {
          if (!item.logo.startsWith(environment.api)) {
            item.logo = environment.api + item.logo;
          }
        })
      })
    );
  })

    this.categoriesResults$ = this.service.getBussinesActive()

    this.metaData.updateMetadata({
      title: 'Directorio'
    })
  }

  selectRedirect(event: any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      if (event.target.value){
        this.router.navigate(['/directorio'], { queryParams: { id: event.target.value }, queryParamsHandling: 'merge' });
      }else {
        this.router.navigate(['/directorio']);
      }
    });
  }

  // resetPage(itemId: number) {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/directorio'], { queryParams: { id: itemId }, queryParamsHandling: 'merge' });
  //   });
  // }



}
