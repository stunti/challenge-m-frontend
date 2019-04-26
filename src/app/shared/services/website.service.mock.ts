import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of, NEVER  } from 'rxjs';
import sprintf from 'src/app/shared/types/sprintf';
import { environment } from 'src/environments/environment';
import moment = require("moment-timezone"); 
import { Website } from '../models/website';

@Injectable({
  providedIn: 'root'
})
export class WebsiteMockService {
	
	public options: Array<any>;

	private _sub: Subject<Website>;
	private _data = new Array<Website>(
		{ id: 1, date: "2018-01-01T00:00:00.000Z", name: "g1", visits: 100 },
		{ id: 2, date: "2018-02-01T00:00:00.000Z", name: "g2", visits: 200 },
		{ id: 3, date: "2018-03-01T00:00:00.000Z", name: "g3", visits: 300 },
		{ id: 4, date: "2018-04-01T00:00:00.000Z", name: "g4", visits: 400 },
		{ id: 5, date: "2018-05-01T00:00:00.000Z", name: "g5", visits: 500 }
	);

	constructor(private readonly httpClient:HttpClient) {
		this.options = new Array();
	}
	
	public fetchdata(startDate: moment.Moment, endDate: moment.Moment) {
		if (this.options['TEST_NO_DATA']) {
			this._sub.complete();
			return;
		}

		for (let i = 0; i < this._data.length; i++) {
			this._sub.next(this._data[i]);
		};
		this._sub.complete();
		
	}

	public listenData() {
		this._sub = new Subject<Website>();
		if (this.options['TEST_LOADING_INDEFINITELY']) {
			return NEVER;
		} else {
			return this._sub.asObservable();
		}
	}
}
