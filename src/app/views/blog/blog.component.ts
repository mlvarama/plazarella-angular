import { Component, OnInit } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { BlogService } from '../../core/services/blog.service';
import { GeneralResponse, PaginationRows } from '../../interfaces/common';
import { BlogEntrance, FeaturedBlog } from '../../interfaces/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogEntranceComponent } from '../../components/blog/blog-entrance/blog-entrance.component';
import { PaginationComponent } from '../../components/common/pagination/pagination.component';
import { Observable, map } from 'rxjs';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogCardComponent } from '../../components/blog/blog-card/blog-card.component';
import { MetadataService } from '../../core/services/meta-tags-manager.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BodyModule, BlogEntranceComponent, PaginationComponent, BlogCardComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  
  constructor(private service: BlogService, private route: ActivatedRoute, private router: Router, private metaService: MetadataService){ }

  blogPaginationData$!: Observable<GeneralResponse<PaginationRows<BlogEntrance[]>>>;
  featuredBlogData$!: Observable<GeneralResponse<FeaturedBlog[]>>;
  data!: PaginationRows<BlogEntrance[]>
  blogEntrances!: BlogEntrance[];
  searchForm = new FormGroup({
    busqueda: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.metaService.updateMetadata({
      title: 'Blog'
    })
    const pagina: string = this.route.snapshot.queryParamMap.get('pagina');
    const busqueda: string = this.route.snapshot.queryParamMap.get('busqueda');
    const request = {
      page: pagina,
      registers: 5,
      search: busqueda
    }
    
    this.blogPaginationData$ = this.service.getBlogPagination(request).pipe(map(
      values => {
        this.data = values.data;
        this.blogEntrances = this.data.rows;
        return values;
      }
    ));

    this.featuredBlogData$ = this.service.getFeaturedBlog().pipe(map(
      value => {
        return value;
      }
    ));
  }


  search(){
    const request = {pagina: 1, ...this.searchForm.value};
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/blog'], {queryParams: request, queryParamsHandling: 'merge'});
    });
  }
}
