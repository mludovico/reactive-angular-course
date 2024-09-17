import { Component } from '@angular/core';
import {MatFooterRow} from "@angular/material/table";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatFooterRow
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  currentYear = new Date().getFullYear();
}
