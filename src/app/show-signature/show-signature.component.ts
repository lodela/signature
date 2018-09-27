import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'show-signature',
  templateUrl: './show-signature.component.html',
  styleUrls: ['./show-signature.component.scss']
})
export class ShowSignatureComponent implements OnInit {
  ReadOnly:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
