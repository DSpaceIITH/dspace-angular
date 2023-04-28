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
    this.fetchNewsData();
  }

  fetchNewsData() {
    // BASE_URL: string = 'http://localhost:8080/server/';

    const collectionsPromise = fetch(
      'http://localhost:8080/server/api/core/collections'
    ).then((response) => response.json());

    const communitiesPromise = fetch(
      'http://localhost:8080/server/api/core/communities'
    ).then((response) => response.json());

    Promise.all([collectionsPromise, communitiesPromise])
      .then(([collectionsData, communitiesData]) => {
        // console.log('Collections:', collectionsData);
        // console.log('Communities:', communitiesData);

        if (collectionsData?.page?.totalElements) {
          this.numberOfCollections = collectionsData.page.totalElements;
        }

        if (communitiesData?.page?.totalElements) {
          this.numberOfCommunities = communitiesData.page.totalElements;
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}
