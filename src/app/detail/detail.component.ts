import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  article: any;
  id: any;
constructor(private act: ActivatedRoute, private data: ArticleService){}

ngOnInit(){
  this.id = this.act.snapshot.paramMap.get('id');
  this.data.getArticleById(this.id)
  .subscribe(
    res => {
      this.article = res;
    }
  )
}
}
