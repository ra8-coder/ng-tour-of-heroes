import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
	private heroesUrl = 'api/heroes';

	constructor(
		private http: HttpClient,
		private messageService: MessageService
		) { }

	/* HeroService에서 보내는 메시지는 MessageService가 화면에 표시합니다. */
	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	}

	/* GET: 서버에서 히어로 목록 가져오기 */
	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl).pipe(
				tap(_ => this.log('getched heroes')),
				catchError( this.handleError<Hero[]>('getHeroes', []))
			);
	}

	/* GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다. */
	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	/** PUT: 서버에 저장된 히어로 데이터를 변경합니다. */
	updateHero (hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
		tap(_ => this.log(`updated hero id=${hero.id}`)),
		catchError(this.handleError<any>('updateHero'))
		);
	}

	/* POST: 서버에 새로운 히어로를 추가합니다. */
	addHero (hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
		tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
		catchError(this.handleError<Hero>('addHero'))
		);
	}

	/*
	* HTTP 요청이 실패한 경우를 처리합니다.
	* 애플리케이션 로직 흐름은 그대로 유지됩니다.
	* @param operation - 실패한 동작의 이름
	* @param result - 기본값으로 반환할 객체
	*/
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

		// TODO: 리모트 서버로 에러 메시지 보내기
		console.error(error); // 지금은 콘솔에 로그를 출력합니다.

		// TODO: 사용자가 이해할 수 있는 형태로 변환하기
		this.log(`${operation} failed: ${error.message}`);

		// 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
		return of(result as T);
		};
	}

}
