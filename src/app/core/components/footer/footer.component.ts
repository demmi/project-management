import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'github-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/svg/github.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'rs-school-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/svg/rs_school.svg'),
    );
  }
}
