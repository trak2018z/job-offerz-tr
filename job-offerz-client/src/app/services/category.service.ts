import { Injectable } from '@angular/core';
import {BasicCrud} from "./basic-crud.interface";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {HttpUtils} from "../utils/http-utils";
import {Category} from "../models/category";
import {PageRequest} from "../models/pagination/page-request";
import {Page} from "../models/pagination/page";

@Injectable()
export class CategoryService implements BasicCrud<Category>{

  baseUrl = '/categories';

  constructor(private http: Http) { }

  getPage(pageRequest: PageRequest, name: string): Observable<Page<Category>> {
    const params = {...pageRequest, name};
    return this.http.get(`${this.baseUrl}/page`, {params})
      .map(HttpUtils.mapResponse);
  }

  getAll(active?: boolean): Observable<Category[]> {
    const params = active !== null ? {active} : {};
    return this.http.get(this.baseUrl, {params})
      .map(HttpUtils.mapResponse);
  }

  get(_id: string): Observable<Category> {
    return undefined;
  }

  add(obj: Category): Observable<Category> {
    return this.http.post(this.baseUrl, obj)
      .map(HttpUtils.mapResponse);
  }

  update(obj: Category): Observable<Category> {
    return this.http.put(this.baseUrl, obj)
      .map(HttpUtils.mapResponse);
  }

  remove(_id: string): Observable<boolean> {
    return undefined;
  }

}
