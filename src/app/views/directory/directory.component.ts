import { Component, Input, OnInit } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { Observable, map } from 'rxjs';
import { GeneralResponse } from '../../interfaces/GeneralResponse';
import { CategoryButtonFrame, DirectoryFrame } from '../../interfaces/directory';
import { DirectoryService } from '../../core/services/directory.service';
import { environment } from '../../../environments/environment';
import { DirectoryFrameComponent } from '../../components/directory/directory-frame/directory-frame.component';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [BodyModule, DirectoryFrameComponent],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.css'
})
export class DirectoryComponent implements OnInit {
  diretoryResults$!: Observable<GeneralResponse<DirectoryFrame[]>>;
  categoriesResults$!: Observable<GeneralResponse<CategoryButtonFrame[]>>;
  @Input() id = '';

  constructor(private service: DirectoryService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.diretoryResults$ = this.service.getDirectorys(Number(this.id) ? Number(this.id) : 0).pipe(
      map(element => {
        element.data.forEach(item => {
          if (!item.logo.startsWith(environment.api)) {
            item.logo = environment.api + item.logo;
          }
        })
        return element;
      })
    );

    this.categoriesResults$ = this.service.getBussinesActive()

  }

  resetPage(itemId: number) { // Assuming item.id is a number
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/directorio'], { queryParams: { id: itemId }, queryParamsHandling: 'merge' });
    });
  }



}
