import { Component, Input, OnInit } from '@angular/core';
import { BodyModule } from '../../common/body/body.module';
import { Observable, map, tap } from 'rxjs';
import { GeneralResponse } from '../../interfaces/common';
import { BlogDetail, FeaturedBlog } from '../../interfaces/blog';
import { BlogService } from '../../core/services/blog.service';
import { environment } from '../../../environments/environment.development';
import { BlogCardComponent } from '../../components/blog/blog-card/blog-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faXTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
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
  whatsappIcon = faWhatsapp;

  facebookShare: string = ''
  twitterShare: string = ''
  whatsAppShare: string = ''

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
      this.blogResponse$ = this.service.getBlogDetail(Number(this.id)).pipe(tap(
        value => {
          this.metaTags.updateMetadata({
            title: value.data[0].title,
            description: value.data[0].abstract,
            image: this.ENV + value.data[0].image
          })
          if (value.data[0].image.includes('(') || value.data[0].image.includes(')')){
            value.data[0].image.replaceAll('(', '\(').replaceAll(')', '\)');
          }
          this.setShareURLs();
        }
      ));

      this.featuredBlogData$ = this.service.getFeaturedBlog();

      this.relatedBlogData$ = this.service.getRelatedBlog(Number(this.id));
    })
  }

  setShareURLs(){
    const url = window.location.href;
    const urlFixed = url.replaceAll('&', '%26')
    const urlFacebook = urlFixed.replaceAll(':', '%3A').replaceAll('/', '%2F');
    this.facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${urlFacebook}&src=sdkpreparse`;
    this.twitterShare = `https://twitter.com/intent/tweet?url=${urlFixed}`;
    this.whatsAppShare = `https://api.whatsapp.com/send?text=${urlFixed}`
  }
}
