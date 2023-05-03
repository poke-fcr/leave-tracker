import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { JbpmSwaggerApiService } from 'src/app/jbpm-swagger-api.service';
import { LeaveTrackerService } from 'src/app/leave-tracker.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit, OnDestroy {
  constructor(private leaveTrackerSvc: LeaveTrackerService, private swaggerSvc: JbpmSwaggerApiService) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  userData: any[] = []
  taskInstanceData: any[] = []

  showToast: boolean = false
  messageContent: string = ''
  messageHeader: string = ''
  getUserData!: Subscription
  getLeaveData!: Subscription
  getTaskData!: Subscription


  ngOnInit() {
    this.getData()
  }

  getData() {
    this.userData = []
    this.getUserData = this.leaveTrackerSvc.getUserData().subscribe({
      next: (userData:any)=>{
        console.log('userdata', userData)
        this.getLeaveData = this.leaveTrackerSvc.getRequests().subscribe({
          next: (reqData: any)=>{
              reqData?.forEach((rd:any) => { 
                userData?.forEach((ud:any) => {
                  if(ud.id === rd.user_id && rd.status === 'in-progress'){
                    let temp = {
                      ...ud,
                      leaveRequest: rd
                    }
                    this.userData.push(temp)
                  }
                });
              });
          }
        })
      }
    })
    console.log(this.userData)
    this.getTaskData = this.swaggerSvc.taskInstances().subscribe({
      next : (value: any) => {
        this.taskInstanceData = value['task-summary'] || []
      }
    })
    // this.leaveTrackerSvc.getPendingRequestsForManager().subscribe({
    //   next: (value: any) => {
    //     console.log(value)
    //     this.userData = value
    //     this.dtTrigger.next(value)
    //   }
    // })
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    if(this.getLeaveData){
    this.getLeaveData.unsubscribe()
    this.getUserData.unsubscribe()
    this.getTaskData.unsubscribe()
    }
  }

  acceptRequest(data: any) {
    // this.leaveTrackerSvc.acceptPendingRequests(Number(id)).subscribe({
    //   next: (_value) => {
    //     alert('Request accepted')
    //     this.getData()
    //   }
    // })
    console.log(data)
    

    let taskId: string | null = null
    this.taskInstanceData.forEach((t: any) => {
      console.log(t)
      if(t['task-proc-inst-id'] == data.leaveRequest['process_id']){
        taskId = t['task-id']
      }
        
    });

    console.log(taskId)

    this.swaggerSvc.startTask(taskId || '').subscribe({next: _v=>{
      this.showMessage('Task initiated', 'Task id: '+ taskId)
      this.swaggerSvc.completeTask(taskId || '', {approve: true}).subscribe({next: _x=>{
        this.showMessage('Task completed', 'Task id: '+ taskId)  
        this.leaveTrackerSvc.updateLeaveData({
            id: data.leaveRequest.id,
            user_id: data.leaveRequest.user_id,
            leaves_requested: data.leaveRequest.leaves_requested,
            status: "Completed",
            process_id: data.leaveRequest.process_id,

          }).subscribe({next: _v=>{
            this.showMessage('Leave data synced', '')

          }})

          this.leaveTrackerSvc.updateUserData({
            id:data.id,
            department: data.department,
            name: data.name,
            email: data.email,
            leaves: data.leaveRequest.leaves_requested,
            baseLocation:data.baseLocation,
          }).subscribe({next: _v =>{
            this.showMessage('User data synced', 'Status changed from in-progress to completed'+ taskId)
            alert('request accepted success')
            this.getData()
          }})
      }})
    }})
    //starts task
    //complete task -> approve
    //update user table
    //update leave request table
  
  }

  rejectRequest(data: any) {
    console.log(data)
    

    let taskId: string | null = null
    this.taskInstanceData.forEach((t: any) => {
      console.log(t)
      if(t['task-proc-inst-id'] == data.leaveRequest['process_id']){
        taskId = t['task-id']
      }
        
    });

    console.log(taskId)

    this.swaggerSvc.startTask(taskId || '').subscribe({next: _v=>{
      this.showMessage('Task initiated', 'Task id: '+ taskId)
      this.swaggerSvc.completeTask(taskId || '', {approve: false}).subscribe({next: _x=>{
        this.showMessage('Task completed', 'Task id: '+ taskId)  
        this.leaveTrackerSvc.updateLeaveData({
            id: data.leaveRequest.id,
            user_id: data.leaveRequest.user_id,
            leaves_requested: data.leaveRequest.leaves_requested,
            status: "Rejected",
            process_id: data.leaveRequest.process_id,

          }).subscribe({next: _v=>{
            this.showMessage('Leave data synced', 'Requested rejected')
            alert('request rejected success')
            this.getData()
          }})
      }})
    }})
    //starts task
    //complete task -> approve
    //update user table
    //update leave request table


  }

  showMessage(messageheader: string, content: string){
    this.messageHeader = messageheader || ''
    this.messageContent = content
    this.showToast = true
  }
}
