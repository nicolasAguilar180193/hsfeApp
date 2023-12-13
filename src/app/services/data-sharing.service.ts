import { Injectable } from '@angular/core';
import { People } from '../data';
import { Person } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataSharingService {
	data: Person[] = People;
	dataObservable = new BehaviorSubject<Person[]>(this.data);

	constructor() {}

	getData() {
		return this.data;
	}

	getAsyncData() {
		return this.dataObservable.asObservable();
	}
}
