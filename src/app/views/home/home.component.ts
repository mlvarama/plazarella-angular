import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/common/navbar/navbar.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { MarginNavbarComponent } from '../../components/common/margin-navbar/margin-navbar.component';
import { GenericButtonComponent } from '../../components/common/generic-button/generic-button.component';
import { GeneriCardComponent } from '../../components/common/generi-card/generi-card.component';
import { MetadataService } from '../../core/services/meta-tags-manager.service';
import { BodyModule } from '../../common/body/body.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BodyModule, GeneriCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  arrayImages: CardProps[] = [
    {
      name: "BELLEZA",
      route: "assets/Home/Mesa de trabajo 8.png"
    },
    {
      name: "CAFETERIA",
      route: "assets/Home/Mesa de trabajo 9.png"
    },
    {
      name: "ENTRETENIMIENTO",
      route: "assets/Home/Mesa de trabajo 10.png"
    },
    {
      name: "ALIMENTOS Y BEBIDAS",
      route: "assets/Home/Mesa de trabajo 11.png"
    },
    {
      name: "ROPA Y ACCESORIOS",
      route: "assets/Home/Mesa de trabajo 12.png"
    },
    {
      name: "ESTACIONAMIENTO",
      route: "assets/Home/Mesa de trabajo 13.png"
    },
  ];

  constructor(private metaData: MetadataService){}

  ngOnInit(): void {
    this.metaData.updateMetadata({
      title: 'Plazarella'
    }, true);
  }




}

interface CardProps {
  name: string,
  route: string
}
