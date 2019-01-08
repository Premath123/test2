import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';



@Injectable()
export class UserService {
    apiUrl: string = 'http://ec2-13-233-164-245.ap-south-1.compute.amazonaws.com:8080/RestApi/api/';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }
    register(user: User) {
        return this.http.post(`${this.apiUrl}add/`, user);
    }
    getById(id: number) {
        return this.http.get(`${this.apiUrl}/user/` + id);
    }

    update(user: any) {
        return this.http.put(`${this.apiUrl}/update/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/delete/` + id);
    }
}
