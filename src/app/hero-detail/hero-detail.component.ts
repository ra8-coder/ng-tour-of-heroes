import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
	hero: Hero;

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location
	) { }

	ngOnInit(): void {
		this.getHero();
	}

	getHero(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.heroService.getHero(id).subscribe(hero => this.hero = hero);
	}

	goBack(): void {
		this.location.back();
	}

}

/*
ActivatedRoute는 HeroDetailComponent의 인스턴스를 생성하면서 적용한 라우팅 규칙에 대한 정보를 담고 있습니다.
그래서 이 라우팅 규칙을 참조하면 URL을 통해 컴포넌트로 전달되는 변수를 추출할 수 있습니다.
화면에 표시할 히어로를 구분할 때도 URL에 포함된 라우팅 변수 id를 사용합니다.
*/
