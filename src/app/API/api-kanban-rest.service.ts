import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board, Column, Task } from '../interface/interface';
import { map, Observable } from 'rxjs';
import { User } from '../auth/model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiKanbanRestService {

  backendURL = 'https://rss-pm.herokuapp.com/';


  constructor(private http: HttpClient) {}

  //Authorization
  registPost(param: User): Observable<User> {
    return this.http.post<User>(this.backendURL + 'signup', param);
  }

  authPost(param: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.backendURL + 'signin', param);
  }

  //Users
  usersGet(): Observable<User[]> {
    return this.http.get<User[]>(this.backendURL + 'users');
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
  boardsGet(): Observable<Board[]> {
    return this.http.get<Board[]>(this.backendURL + 'boards');
  }

  boardsPost(param: Board): Observable<Board> {
    return this.http.post<Board>(this.backendURL + 'boards', param);
  }

  boardGet(id: string) {
    return this.http.get(this.backendURL + 'boards/' + id);
  }

  boardDelete(id: string): Observable<number | string> {
    return this.http.delete<number | string>(this.backendURL + 'boards/' + id);
  }

  boardPut(id: string, param: Board) {
    return this.http.put(this.backendURL + 'boards/' + id, param);
  }

  //Columns
  columnsGet(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(this.backendURL + 'boards/' + boardId + '/columns')
      .pipe(
        map(columns => columns.map(column => {
          column.boardId = boardId;
          return column;
        })),
      );
  }

  columnsPost(boardId: string, param: Column): Observable<Column> {
    return this.http.post<Column>(this.backendURL + 'boards/' + boardId + '/columns', param)
      .pipe(
        map(column => {
          column.boardId = boardId;
          return column;
        }),
      );
  }

  columGet(boardId: string, columnId: string) {
    return this.http.get<Column>(this.backendURL + 'boards/' + boardId + '/columns/' + columnId);
  }

  columnDelete(boardId: string, columnId: string): Observable<number | string> {
    return this.http.delete<number | string>(this.backendURL + 'boards/' + boardId + '/columns/' + columnId);
  }

  columnPut(boardId: string, columnId: string, param: Column): Observable<Column> {
    return this.http.put<Column>(this.backendURL + 'boards/' + boardId + '/columns/' + columnId, param);
  }

  //Tasks
  tasksGet(boardId: string, columId: string) {
    return this.http.get(this.backendURL + 'boards/' + boardId + '/columns/' + columId + '/tasks');
  }

  tasksPost(boardId: string, columId: string, param: Task): Observable<Task> {
    return this.http.post<Task>(this.backendURL + 'boards/' + boardId + '/columns/' + columId + '/tasks', param);
  }

  taskGet(boardId: string, columId: string, taskId: string) {
    return this.http.get(this.backendURL + 'boards/' + boardId + '/columns/' + columId + '/tasks/' + taskId);
  }

  taskDelete(boardId: string, columId: string, taskId: string) {
    return this.http.delete(this.backendURL + 'boards/' + boardId + '/columns/' + columId + '/tasks/' + taskId);
  }

  taskPut(boardId: string, columId: string, taskId: string, param: Task) {
    return this.http.put(this.backendURL + 'boards/' + boardId + '/columns/' + columId + '/tasks/' + taskId, param);
  }

  //Upload/Download file
}
