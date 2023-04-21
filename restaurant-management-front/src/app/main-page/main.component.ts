import { Component, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy, AfterViewInit {
  isExpanded: boolean = false;

  constructor() {}

  ngOnDestroy(): void {}
  ngAfterViewInit() {}
}
