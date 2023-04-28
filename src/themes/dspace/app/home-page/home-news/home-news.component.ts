import { Component, OnInit } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';

@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent implements OnInit {
  key: string[];
  data: any;

  ngOnInit() {
    console.log('Here__');
    this.fetchData();
  }

  fetchData() {
    fetch('https://iith.dev/dining.json')
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}
