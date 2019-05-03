import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WebsiteService } from 'src/app/shared/services/website.service';
import moment = require("moment-timezone");
import { Website } from 'src/app/shared/models/website';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';


interface IEntry {
    dtStart: moment.Moment;
    dtEnd:  moment.Moment;
};

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
	private userQuestionUpdate = new Subject<IEntry>();

	constructor(private readonly websiteService:WebsiteService) {  
		this.resetData();
		this._isLoading = false;

		//debounce to avoid flooding the backend
		this.userQuestionUpdate.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe( (value: IEntry) => {
				this.resetData();
				
				this.websiteService.fetchdata(value.dtStart, value.dtEnd);
			});
	}

  	ngOnInit() {}

	ngOnChanges() {

		const startDt = moment.tz(this.startDate, "UTC");
		const endDt = moment.tz(this.endDate, "UTC");

		
		if (startDt.isValid() && endDt.isValid()) {
			//check date is post 2010 to prevent false processing when typing date with keyboard
			if (startDt.year() > 2010 && endDt.year() > 2010) {
				// Debounce search.
				this._isLoading = true;
				this.userQuestionUpdate.next(<IEntry>{dtStart: startDt, dtEnd: endDt})
			}
		}
	}

	private resetData() {
		console.log('reset data');
		this._data = new Array();
		this.websiteService.listenData().subscribe({
			next: (data) => {
				console.log('[TableComponent] receive data');
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
		return this._isLoading;
	}

}
