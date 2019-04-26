import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import sprintf from 'src/app/shared/types/sprintf';
import { environment } from 'src/environments/environment';
import moment = require("moment-timezone"); 
import { Website } from '../models/website';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

	public options: Array<any>;

	private websiteSubject: Subject<Website>;

	constructor(private readonly httpClient:HttpClient) {
		this.websiteSubject = new Subject();
	 }
	
	public fetchdata(startDate: moment.Moment, endDate: moment.Moment) {
		
		const url = sprintf`${0}/website/${1}/${2}`( environment.backendUrl, startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD") );

		console.log("url: ", url);
		this.httpClient.get(url)
			.subscribe({
				next: (data) => {

				if (data instanceof Array) {
					for (let i = 0; i < data.length; i++) {
						this.websiteSubject.next(data[i]);
					}
				}
				this.websiteSubject.complete();
			},
			complete: () => {
				console.log('[WebsiteService] fetchdata complete');
				this.websiteSubject.complete();
			},
			error: (err) => {
				console.log('[WebsiteService] fetchdata error', err);
				this.websiteSubject.complete();
			}
		});
	}

	public listenData(): Observable<Website> {
		this.websiteSubject = new Subject<Website>();
		return this.websiteSubject.asObservable();
	}
}
