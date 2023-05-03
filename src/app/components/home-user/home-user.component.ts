import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LeaveTrackerService } from 'src/app/leave-tracker.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})

export class HomeUserComponent implements OnInit, OnDestroy {
  constructor(private leaveTrackerSvc: LeaveTrackerService) { }
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  sampleData: any[] = []

  ngOnInit() {
  
  //   this.leaveTrackerSvc.getLeaveTrackerData().subscribe({
  //     next: (value: any) => {
  //       console.log(value.data)
  //       this.sampleData = value
  //       // this.dtTrigger.next();
  //     }
  //   })
      this.leaveTrackerSvc.getUserData().subscribe({
        next: (data:any)=>{
          this.sampleData = data
          console.log('userdata', data)
          this.leaveTrackerSvc.getRequests().subscribe({
            next: (data: any)=>{
              console.log('request data', data)
              data?.forEach((req:any) => {
                this.sampleData.forEach((user: any)=>{
                  if(req?.user_id === user.id){
                    user['leaveRequest'] = req  
                  }
                })  
              });
            }
          })
        }
      })

}

  broadcastMe(data: any){
    console.log("next")
    this.leaveTrackerSvc.sendData(data)
  }


  ngOnDestroy() {
    // this.dtTrigger.unsubscribe();
  }
}
