import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText?: string;
  @Input() iconName?: string;
  currentIcon?: IconDefinition;

  ngOnChanges() {
    if (this.iconName) {
      this.currentIcon = this.getIconByName(this.iconName);
    }
  }
  
  getIconByName(iconName: string): IconDefinition | undefined {
    switch (iconName) {
      case 'delete':
        return faTrashCan;
      case 'edit':
        return faPencil;
      default:
        return undefined;
    }
  }
}
