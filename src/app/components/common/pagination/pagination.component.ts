import { Component, Input, OnInit } from '@angular/core';
import { PaginationRows } from '../../../interfaces/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{

  @Input() data: PaginationRows<any>;
  @Input() baseRute: string;
  pagesNumber: number[]

  constructor (private route: Router){ }

  ngOnInit(): void {
    this.pagesNumber = [...Array(Number(this.data.totalPages)).fill(0)].map((n, index) => index + 1);
  }

  navigateToRoute(page: number){
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/blog'], {queryParams: {pagina: page}, queryParamsHandling: 'merge'});
    });
  }

}
