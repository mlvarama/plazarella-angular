
import { Inject, Injectable } from '@angular/core';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';
import { Router } from '@angular/router';


export interface PageMetadata {
  title: string;
  description: string;
  image: string;
  author: string;
  keywords: string[];
  type: string;
}

const defaultMetadata: PageMetadata = {
  title: 'Plazarella',
  description: 'Plazarella un gran centro comercial en San Francisco del Rincón.  Más de 30 tiendas, ¡conócenos y disfruta la experiencia!.',
  author: 'Plazarella',
  keywords: ['centro comercial', 'plaza', 'locales', 'cine', 'San Francisco', 'San Francisco del Rincón', 'comida'],
  type: 'website',
  image: 'https://plazarella.com/assets/Home/PLAZARELLA.png',
}

@Injectable({
  providedIn: 'root' 
})
export class MetadataService {
  constructor(private metaTagService: Meta,
              private titleService: Title,
              private router: Router) { }

  public updateMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
    const pageMetadata: PageMetadata = {...defaultMetadata, ...metadata};
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata, index);
    for (const metaTag of metatags){
      this.metaTagService.updateTag(metaTag); 
    }

    this.titleService.setTitle(pageMetadata.title);
  }

  private generateMetaDefinitions(metadata: PageMetadata, index: boolean): MetaDefinition[] {
    return [
      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },

      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },
      
      { name: 'author', content: metadata.author },
      { property: 'og:author', content: metadata.author },
      
      { name: 'keywords', content: metadata.keywords.join(', ') },
      
      { property: 'og:type', content: metadata.type },

      { property: 'og:image', content: metadata.image },
      { property: 'og:url', content: `https://plazarella.com${this.router.url}`},

      { name: 'robots', content: index ? 'index, follow' : 'noindex' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ];
  }
}
