import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Board, Column, Registration, Task } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class ApiKanbanRestService {
  backendURL = 'http://localhost:4200/api/';

  constructor(private http: HttpClient) {}

  //Authorization
  registPost(param: Registration) {
    return this.http.post(this.backendURL + 'signup', param);
  }

  authPost(param: Auth) {
    return this.http.post(this.backendURL + 'signin', param);
  }

  //Users
  usersGet() {
    return this.http.get(this.backendURL + 'users');
  }

  userGet(id: string) {
    return this.http.get(this.backendURL + 'users/' + id);
  }

  userDelete(id: string) {
    return this.http.delete(this.backendURL + 'users/' + id);
  }

  //Param interface?
  userPut(id: string, param: Object) {
    return this.http.put(this.backendURL + 'users/' + id, param);
  }

  //Boards
  bordsGet() {
    return this.http.get(this.backendURL + 'boards');
  }

  bordsPost(param: Board) {
    return this.http.post(this.backendURL + 'boards', param);
  }

  bordGet(id: string) {
    return this.http.get(this.backendURL + 'boards/' + id);
  }

  bordDelete(id: string) {
    return this.http.delete(this.backendURL + 'boards/' + id);
  }

  bordPut(id: string, param: Board) {
    return this.http.put(this.backendURL + 'boards/' + id, param);
  }

  //Columns
  columsGet(boardId: string) {
    return this.http.get(this.backendURL + 'boards/' + boardId + '/colums');
  }

  columsPost(boardId: string, param: Column) {
    return this.http.post(this.backendURL + 'boards/' + boardId + '/colums', param);
  }

  columGet(boardId: string, columId: string) {
    return this.http.get(this.backendURL + 'boards/' + boardId + '/colums/' + columId);
  }

  columDelete(boardId: string, columId: string) {
    return this.http.delete(this.backendURL + 'boards/' + boardId + '/colums/' + columId);
  }

  columPut(boardId: string, columId: string, param: Column) {
    return this.http.put(this.backendURL + 'boards/' + boardId + '/colums/' + columId, param);
  }

  //Tasks
  tasksGet(boardId: string, columId: string) {
    return this.http.get(this.backendURL + 'boards/' + boardId + '/colums/' + columId + '/tasks');
  }

  tasksPost(boardId: string, columId: string, param: Task) {
    return this.http.post(this.backendURL + 'boards/' + boardId + '/colums/' + columId + '/tasks', param);
  }

  taskGet(boardId: string, columId: string, taskId: string) {
    return this.http.get(this.backendURL + 'boards/' + boardId + '/colums/' + columId + '/tasks/' + taskId);
  }

  taskDelete(boardId: string, columId: string, taskId: string) {
    return this.http.delete(this.backendURL + 'boards/' + boardId + '/colums/' + columId + '/tasks/' + taskId);
  }

  taskPut(boardId: string, columId: string, taskId: string, param: Task) {
    return this.http.put(this.backendURL + 'boards/' + boardId + '/colums/' + columId + '/tasks/' + taskId, param);
  }

  //Upload/Download file
}
