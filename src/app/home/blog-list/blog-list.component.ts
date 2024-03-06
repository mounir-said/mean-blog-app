import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  articles: any;

  constructor(private data: ArticleService){}

  ngOnInit(): void{
    this.data.getAll()
    .subscribe(
      res => {
        this.articles = res;
      },
      err => {
         console.log(err)
      }

    );
  }
}
