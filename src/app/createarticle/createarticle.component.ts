import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataSizeOperator } from 'mongoose';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent {
  article: any={
    title: '',
    content:'',
    tags: [],
    description:''
  }

  image: any;
  tag: any= '';
  select(e: any){
    this.image = e.target.files[0];
  }

  constructor(private _auth: AuthService, private data: ArticleService, private router: Router){}

  create(){
    let fd = new FormData();
    fd.append('title', this.article.title)
    fd.append('content', this.article.content)
    fd.append('tags', this.article.tags.toString())
    fd.append('descrition', this.article.description)
    fd.append('image', this.image)
    fd.append('idAuthor', this._auth.getAuthorDataFromToken()._id)
    this.data.create(fd)
    .subscribe(
      res => {
          this.router.navigate(['/home'])
      },
      err => {
        console.log(err)
      }
    )
  }
}
