import { TestBed, async, getTestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


@Component({
	selector: 'app-table',
	template: '',
})
class MockTableComponent {

	@Input() startDate: string;
	@Input() endDate: string;
}

describe('AppComponent', () => {
	let injector: TestBed;
//	let service: GithubApiService;
	let httpMock: HttpTestingController;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [
				AppComponent,
				MockTableComponent,
			],
			imports: [
				ReactiveFormsModule,
				HttpClientTestingModule, 
			],
		}).compileComponents();
		
		injector = getTestBed();
    //service = injector.get(GithubApiService);
    httpMock = injector.get(HttpTestingController);

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

 
  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to frontend3!');
  // });
});
