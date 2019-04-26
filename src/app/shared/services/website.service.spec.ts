import { TestBed } from '@angular/core/testing';

import { WebsiteService } from './website.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WebsiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientTestingModule, 
		]
	}));

  it('should be created', () => {
    const service: WebsiteService = TestBed.get(WebsiteService);
    expect(service).toBeTruthy();
  });
});
