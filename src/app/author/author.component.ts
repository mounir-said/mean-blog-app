import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  id : any;
  author: any;
  articles: any;
  constructor(private act: ActivatedRoute, private _auth: AuthService, private data: ArticleService){}

  ngOnInit(): void{
    this.id = this.act.snapshot.paramMap.get('id');
    this._auth.getById(this.id)
    .subscribe(
      res => {
        this.author = res;
      }
    )
      this.data.getArticleByIdAuthor(this.id)
      .subscribe(
        res => {
          this.articles = res;
        },
        err => {
          console.log(err);
        }
      )
   }
}
