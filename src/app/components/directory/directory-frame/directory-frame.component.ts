import { Component, Input } from '@angular/core';
import { DirectoryFrame } from '../../../interfaces/directory';
import { BodyModule } from '../../../common/body/body.module';

@Component({
  selector: 'app-directory-frame',
  standalone: true,
  imports: [BodyModule],
  templateUrl: './directory-frame.component.html',
  styleUrl: './directory-frame.component.css'
})
export class DirectoryFrameComponent {
  @Input() data: DirectoryFrame;
}
