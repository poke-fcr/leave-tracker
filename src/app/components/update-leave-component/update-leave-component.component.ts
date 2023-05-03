import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JbpmSwaggerApiService } from 'src/app/jbpm-swagger-api.service';
import { LeaveTrackerService } from 'src/app/leave-tracker.service';


@Component({
  selector: 'app-update-leave-component',
  templateUrl: './update-leave-component.component.html',
  styleUrls: ['./update-leave-component.component.scss']
})
export class UpdateLeaveComponentComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private leaveTrackerSvc: LeaveTrackerService, private swaggerSvc: JbpmSwaggerApiService) { }
  leaveForm = new FormGroup({
    name: new FormControl(''),
    department: new FormControl(''),
    email: new FormControl(''),
    baseLocation: new FormControl(''),
    leaves: new FormControl(10),
    newLeaveDays: new FormControl(0)
  })
  userId: string | null = null
  showNewLeaveDays: boolean = false
  userData: any
  ngOnInit() {

    this.activatedRoute.queryParamMap.subscribe(value => {
      this.userId = value.get('id') || null
      console.log(value)
    })
    if (!this.userId || Number.isNaN(Number(this.userId))) {
      alert(`You don't have access to this page.`)
      this.router.navigate(['user-home'])
    }
    console.log('before observer response')
    
      this.leaveTrackerSvc.data.subscribe({
        next: (resp: any) => {
          this.userData = resp
          console.log('observer response')
          if(resp?.leaveRequest?.leaves_requested){
            this.showNewLeaveDays = true
          }
          this.leaveForm.get('newLeaveDays')?.setValue(resp?.leaveRequest?.leaves_requested || 'NA')
          this.leaveForm.get('name')?.setValue(resp?.name || 'NA')
          this.leaveForm.get('department')?.setValue(resp?.department || 'NA')
          this.leaveForm.get('email')?.setValue(resp?.email || 'NA')
          this.leaveForm.get('baseLocation')?.setValue(resp?.baseLocation || 'NA')
          this.leaveForm.get('leaves')?.setValue(resp?.leaves || 'NA')
        }
      })
    this.leaveForm.get('name')?.disable()
    this.leaveForm.get('department')?.disable()
    this.leaveForm.get('email')?.disable()
    this.leaveForm.get('baseLocation')?.disable()
    this.leaveForm.get('newLeaveDays')?.disable()
  }

  raiseRequestForLeaveDays() {
    let newLeaveDays = this.leaveForm.get('leaves')?.value || 0
    console.log(newLeaveDays)
    if(this.userData?.leaveRequest?.id && this.userData.leaveRequest.process_id && this.showNewLeaveDays){
      this.swaggerSvc.deleteProcess(this.userData.leaveRequest.process_id).subscribe({next: (value: any)=>{
        console.log('previous process id aborted', this.userData.leaveRequest.process_id)
      }})
    }
    this.swaggerSvc.instantiateProcess().subscribe({
      next: (value: any) => {
        let req = {
          id: this.userData?.leaveRequest?.id || null,
          user_id: this.userData.id || this.userId,
          status: 'in-progress',
          leaves_requested: newLeaveDays,
          process_id: value
        }
        this.leaveTrackerSvc.raiseRequestForLeaveDays(req).subscribe({
          next: (value: any) => {
            alert("Request raised. Navigating back to homepage")
            this.router.navigate(['user-home'])
          }
        })
      }
    })

  }
}
