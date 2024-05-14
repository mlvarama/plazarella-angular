import { Component, Input, OnInit } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { Observable, map } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { BlogDetail, FeaturedBlog } from '../../interfaces/blog';
import { BlogService } from '../../core/services/blog.service';
import { environment } from '../../../environments/environment.development';
import { BlogCardComponent } from '../../components/blog/blog-card/blog-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { MetadataService } from '../../core/services/meta-tags-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [BodyModule, BlogCardComponent, FontAwesomeModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  facebookIcon = faFacebook;
  twitterIcon = faXTwitter;
  instagramIcon = faInstagram;

  id = '';
  showLoader: boolean;
  relatedIcon = faCircle;
  blogResponse$!: Observable<GeneralResponse<BlogDetail[]>>;
  featuredBlogData$!: Observable<GeneralResponse<FeaturedBlog[]>>;
  relatedBlogData$!: Observable<GeneralResponse<FeaturedBlog[]>>;

  constructor (private service: BlogService, private metaTags: MetadataService, private route: ActivatedRoute ){}
  ENV: string = environment.api;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.blogResponse$ = this.service.getBlogDetail(Number(this.id)).pipe(map(
        value => {
          this.metaTags.updateMetadata({
            title: value.data[0].title,
            description: value.data[0].abstract,
            image: this.ENV + value.data[0].image
          })
          if (value.data[0].image.includes('(') || value.data[0].image.includes(')')){
            value.data[0].image.replaceAll('(', '\(').replaceAll(')', '\)');
          }
          return value;
        }
      ));

      this.featuredBlogData$ = this.service.getFeaturedBlog();

      this.relatedBlogData$ = this.service.getRelatedBlog(Number(this.id));
    })
  }
}
