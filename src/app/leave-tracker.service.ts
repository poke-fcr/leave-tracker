import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveTrackerService {

  private dataSource: BehaviorSubject<string> = new BehaviorSubject<any>({});
  data: Observable<string> = this.dataSource.asObservable();

  sendData(data: any){
    this.dataSource.next(data)
  }
  

  sampleData: any[] = [{
    id: 1,
    status: 'none',
    name: 'Vishal Jain',
    department: 'Application project 3',
    email: 'vishal-jain@gmail.com',
    baseLocation: 'Noida',
    leaves: 5,
    newLeaveDays: 0
  },
  {
    id: 2,
    status: 'none',
    name: 'Kane Williamon',
    department: 'Application project 4',
    email: 'k.williamson@gmail.com',
    baseLocation: 'Tauranga',
    leaves: 3,
    newLeaveDays: 0
  },
  {
    id: 3,
    status: 'none',
    name: 'Sam Millers',
    department: 'Cloud Support',
    email: 'miller.sam90@yahoo.com',
    baseLocation: 'Mumbai',
    leaves: 10,
    newLeaveDays: 0
  },
  {
    id: 4,
    status: 'none',
    name: 'Ishan',
    department: 'Service desk support',
    email: 'ishan@gmail.com',
    baseLocation: 'Kolkata',
    leaves: 12,
    newLeaveDays: 0
  },
  {
    id: 5,
    status: 'none',
    name: 'Tim David',
    department: 'Application project 1',
    email: 'david.8989@hotmail.com',
    baseLocation: 'Chennai',
    leaves: 17,
    newLeaveDays: 0
  },
  {
    id: 6,
    status: 'none',
    name: 'Arjun Tendulkar',
    department: 'Delivery',
    email: 'arjunt@gmail.com',
    baseLocation: 'Mumbai',
    leaves: 2,
    newLeaveDays: 0
  }]

  constructor(private http: HttpClient) {}

  // apis from spring boot 
  getUserData(){
    return this.http.get("http://localhost:8081/api/users")
  }

  getRequests(){
    return this.http.get('http://localhost:8081/api/users/getAllRequests')
  }

  getUserByUserId(userId: string){
    return this.http.get(`http://localhost:8081/api/users/getUserByUserId?id=${userId}`)
  }

  raiseRequestForLeaveDays(reqData: any){
    return this.http.post('http://localhost:8081/api/users', reqData)
  }

  updateUserData(req: any){
    return this.http.put('http://localhost:8081/api/users/updateUsers', req)
  }

  updateLeaveData(req:any){
    return this.http.put('http://localhost:8081/api/users/updateLeaves', req)
  }


  // hardcoded apis
  getLeaveTrackerData(): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.sampleData)
    })
  }

  getLeaveTrackerDataById(id: number): Observable<any> {
    return new Observable((observer) => {
      observer.next(
        this.sampleData.find(value=>{
          return value.id === id
      }))
    })
  }

  updateLeaveDays(id: number, leaveDays: number): Observable<any>{
    this.sampleData.forEach(sData => {
      if(sData.id === id){
        sData.status = 'In Progress',
        sData.newLeaveDays = leaveDays
      }
    });
    return new Observable(value=>{
      value.next('Success')
    })
  }

  getPendingRequestsForManager(){
    return new Observable((observer) => {
      observer.next(
        this.sampleData.filter(value=>{
          return value.status === 'In Progress'
      }))
    })
  }

  acceptPendingRequests(id: number){
    this.sampleData.forEach(sData => {
      if(sData.id === id){
        sData.status = 'Accepted',
        sData.leaveDays = sData.newLeaveDays
        sData.newLeaveDays = 0
      }
    });
    console.log(this.sampleData)
    return new Observable(value=>{
      value.next('Success')
    })
  }

  rejectPendingRequests(id: number){
    this.sampleData.forEach(sData => {
      if(sData.id === id){
        sData.status = 'Rejected',
        sData.newLeaveDays = 0
      }
    });
    return new Observable(value=>{
      value.next('Success')
    })
  }

}
