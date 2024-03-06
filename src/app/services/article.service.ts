import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }
  url = 'http://127.0.0.1:3000/articles';

  create(article: any){
    return this.http.post(this.url + '/add', article)
  }

  getAll(){
    return this.http.get(this.url + '/getAll')
  }

  getArticleByIdAuthor(id: any){
    return this.http.get(this.url + '/getByIdAuthor/' + id)
  }

  getArticleById(id: any){
    return this.http.get(this.url + '/getById/' + id)
  }
}
