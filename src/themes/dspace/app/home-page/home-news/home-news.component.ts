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
  numberOfCollections: number;
  numberOfCommunities: number;

  ngOnInit() {
    console.log('Here__');
    this.fetchNewsData();
  }

  fetchNewsData() {
    // BASE_URL: string = 'http://localhost:8080/server/';

    fetch('http://localhost:8080/server/api/core/collections')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data?.page?.totalElements) {
          this.numberOfCollections = data.page.totalElements;
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    fetch('http://localhost:8080/server/api/core/communities')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data?.page?.totalElements) {
          this.numberOfCommunities = data.page.totalElements;
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}
