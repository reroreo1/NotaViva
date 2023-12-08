import { Component, OnInit } from '@angular/core';
import { CommunService} from '../../../services/commun.service';
import { EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar-section',
  templateUrl: './navbar-section.component.html',
  styleUrls: ['./navbar-section.component.scss']
})
export class NavbarSectionComponent implements OnInit {
  connectedUser: any;
  isVisible: boolean;
  isChevronRight: boolean = false;
  @Output() navbarStateChange = new EventEmitter<boolean>();
  constructor(public communService: CommunService) { 
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.communService.toggleStyle = '';
    this.connectedUser = localStorage.getItem('connectedUser');
    // console.log(this.connectedUser);
  }
  toggleMenu(){
    this.isVisible = !this.isVisible;
    this.isChevronRight = this.isVisible;
    this.navbarStateChange.emit(this.isVisible);
  }
}
