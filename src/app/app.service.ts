import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const data_URL = 'http://10.10.114.97:5556/microFrontend';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get(data_URL + "/getData/");
    }

    _deleteRecord(id) {
        return this.http.delete(data_URL + "/delete/" + id);
    }

    _editRecord(id, rec) {
        return this.http.put(data_URL + "/edit/" + id, rec);
    }

    recordGST(id, rec) {
        return this.http.put(data_URL + "/addGST/" + id, rec);
    }
}