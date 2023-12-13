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

	getAsyncData(): Observable<Person[]> {
		return this.peopleObservable;
	}

	getFavoritePeople(): Observable<Person[]> {
		return this.peopleObservable.pipe(
			map((people) => people.filter((person) => person.favorite))
		);
	}

	toggleFavorite(id: number): void {
		const people = this.peopleSubject.getValue();
		const favoriteIndex = people.findIndex((person) => person.id === id);
		people[favoriteIndex].favorite = !people[favoriteIndex].favorite;
		this.peopleSubject.next(people);
	}
}
