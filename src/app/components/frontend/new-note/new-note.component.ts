import { Component ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../services/shared-service';
@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent {
  editorContent: string = '';
  
  navbarOpen = false;
  private textSubscription!: Subscription;
  constructor(private sharedService: SharedService) {
    this.textSubscription = this.sharedService.currentText.subscribe(
      (text: string) => this.editorContent = text
    );
  }
  ngOnDestroy() {
    this.textSubscription.unsubscribe();
  }
}
