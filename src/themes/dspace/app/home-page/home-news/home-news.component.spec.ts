import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeNewsComponent } from './home-news.component';

fdescribe('HomeNewsComponent', () => {
  let component: HomeNewsComponent;
  let fixture: ComponentFixture<HomeNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeNewsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNewsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch news data and update numberOfCollections and numberOfCommunities', () => {
    const collectionsData = {
      page: {
        totalElements: 10,
      },
    };

    const communitiesData = {
      page: {
        totalElements: 5,
      },
    };

    spyOn(window, 'fetch').and.returnValues(
      Promise.resolve({
        json: () => Promise.resolve(collectionsData),
      }),
      Promise.resolve({
        json: () => Promise.resolve(communitiesData),
      })
    );

    component.ngOnInit();

    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/server/api/core/collections'
    );
    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/server/api/core/communities'
    );

    expect(component.numberOfCollections).toBe(10);
    expect(component.numberOfCommunities).toBe(5);
  });

  fit('should handle errors during data fetching', () => {
    const errorMessage = 'Failed to fetch data';
    spyOn(window, 'fetch').and.returnValues(
      Promise.reject(errorMessage),
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    spyOn(console, 'error');

    component.ngOnInit();

    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching data:',
      errorMessage
    );
  });
});
