import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
})
export class HomeNewsComponent implements OnInit {
  numberOfCollections: number;
  numberOfCommunities: number;

  ngOnInit() {
    this.fetchNewsData().subscribe({
      next: ([collectionsData, communitiesData]) => {
        if (collectionsData?.page?.totalElements) {
          this.numberOfCollections = collectionsData.page.totalElements;
        }

        if (communitiesData?.page?.totalElements) {
          this.numberOfCommunities = communitiesData.page.totalElements;
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  fetchNewsData(): Observable<[any, any]> {
    return new Observable<[any, any]>((observer: Observer<[any, any]>) => {
      const collectionsPromise = fetch(
        'http://localhost:8080/server/api/core/collections'
      ).then((response) => response.json());

      const communitiesPromise = fetch(
        'http://localhost:8080/server/api/core/communities'
      ).then((response) => response.json());

      Promise.all([collectionsPromise, communitiesPromise])
        .then(([collectionsData, communitiesData]) => {
          observer.next([collectionsData, communitiesData]);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
