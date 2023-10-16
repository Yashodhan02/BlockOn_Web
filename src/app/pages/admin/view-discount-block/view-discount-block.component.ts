import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-view-discount-block',
  templateUrl: './view-discount-block.component.html',
  styleUrls: ['./view-discount-block.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(500, style({ opacity: 6 }))
      ])
    ])
  ]
})
export class ViewDiscountBlockComponent implements OnInit{
  showUIElements: boolean;
  constructor() { }
  ngOnInit(): void {
    setTimeout(() => {
      this.showUIElements = true;
    }, 600000000);
  }

}
