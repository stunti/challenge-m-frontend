import { async, ComponentFixture, TestBed, getTestBed, tick, fakeAsync } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { WebsiteMockService } from 'src/app/shared/services/website.service.mock';


describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
	let service: WebsiteService;
	let injector: TestBed;
	let http;
	

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ TableComponent ],
			imports: [
				HttpClientTestingModule, 
			],
			providers: [
				{provide: WebsiteService, useClass: WebsiteMockService},
			],
    })
		.compileComponents();

		injector = getTestBed();
		service = injector.get(WebsiteService);
		http = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
		fixture.detectChanges();
		component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
	});
	
	it('should display results', () => {
		component.startDate = '2018-01-01';
		component.endDate = '2018-02-01';
		
		component.ngOnChanges();

		setTimeout(() => { 
			fixture.detectChanges();
			expect(component.data.length).toEqual(5); 

			const debugTaskTitle = fixture.debugElement.queryAll(By.css('table.table-display tr'));
			
			expect(debugTaskTitle.length).toEqual(5);
		}, 1000);


	});

	it('should display an empty state', () => {
		component.startDate = '2010-01-01';
		component.endDate = '2010-02-01';

		service.options['TEST_NO_DATA'] = true; 
		service.options['TEST_LOADING_INDEFINITELY'] = false; 

		component.ngOnChanges();
		fixture.detectChanges();
		const debugTaskTitle = fixture.debugElement.queryAll(By.css('.empty'));
		expect(debugTaskTitle.length).toEqual(1); 

	});
	
 
	it('should display a loading state', () => {
		service.options['TEST_LOADING_INDEFINITELY'] = true;  

		component.ngOnChanges();
		fixture.detectChanges();
		const debugTaskTitle = fixture.debugElement.queryAll(By.css('.loading'));
		expect(debugTaskTitle.length).toEqual(1);

	});

});
