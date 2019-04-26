import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WebsiteService } from 'src/app/shared/services/website.service';
import moment = require("moment-timezone");
import { Website } from 'src/app/shared/models/website';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

	private _data: Array<Website>;

	@Input() startDate: string;
	@Input() endDate: string;

	private _isLoading: boolean;
	
	constructor(private readonly websiteService:WebsiteService) {  
		this.resetData();
		this._isLoading = false;
	}

  ngOnInit() {
		
		
	}

	ngOnChanges() {

		const startDt = moment.tz(this.startDate, "UTC");
		const endDt = moment.tz(this.endDate, "UTC");

		if (startDt.isValid() && endDt.isValid()) {
			this.resetData();
			this._isLoading = true;
		
			this.websiteService.fetchdata(startDt, endDt);
		}
	}

	private resetData() {
		this._data = new Array();
		this.websiteService.listenData().subscribe({
			next: (data) => {
				this._data.push(data);	
				this._isLoading = false;	
			},
			complete: () => {
				console.log('[TableComponent] websiteService.listenData complete');
				this._isLoading = false;	
			},
			error: (err) => {
				console.log('[TableComponent] websiteService.listenData error ', err);
				this._isLoading = false;	
			},
		});
	}

	get data() {
		return this._data;
	}

	get isLoading() {
		console.log("isloading:", this._isLoading, this._data.length);
		return this._isLoading;
	}

}
