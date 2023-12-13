import { Injectable } from '@angular/core';
import { People } from '../data';
import { Person } from '../models';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataSharingService {
	private peopleSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>(People);
	peopleObservable: Observable<Person[]> = this.peopleSubject.asObservable();

	constructor() {}

	getAsyncData(): Observable<Person[]> {
		return this.peopleObservable;
	}

	getFavoritePeople(): Observable<Person[]> {
		return this.peopleObservable.pipe(
			map((people) => people.filter((person) => person.favorite))
		);
	}
}
