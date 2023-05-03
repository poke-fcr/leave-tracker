import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * from ''

@Injectable({
  providedIn: 'root'
})
export class JbpmSwaggerApiService {

  baseUrl: string = 'http://localhost:8080/kie-server/services/rest/server'
  constructor(private http: HttpClient) { }

  api = {
    processInstantiate: '/containers/LeaveTrackerdemo1_1.0.0-SNAPSHOT/processes/LeaveTrackerdemo1.LeaveTrackProcess/instances'
  }


  instantiateProcess() {
    return this.http.post(this.baseUrl + this.api.processInstantiate, {}, {
      headers: {
        'Authorization': "Basic " + window.btoa('wbadmin:wbadmin')
      }
    }
    )
  }

  deleteProcess(processId: string){
    return this.http.delete(this.baseUrl + `/containers/LeaveTrackerdemo1_1.0.0-SNAPSHOT/processes/instances/${processId}`, {
      headers: {
        'Authorization': "Basic " + window.btoa('wbadmin:wbadmin')
      }
    })
  }

  taskInstances(){
    return this.http.get('http://localhost:8080/kie-server/services/rest/server/queries/tasks/instances/pot-owners?user=wbadmin&page=0&pageSize=10&sortOrder=true&=', {
      headers: {
        'Authorization': "Basic " + window.btoa('wbadmin:wbadmin')
      }
    })
  }

startTask(taskid: string){
  return this.http.put(`http://localhost:8080/kie-server/services/rest/server/containers/LeaveTrackerdemo1_1.0.0-SNAPSHOT/tasks/${taskid}/states/started?user=wbadmin`,{}, {
      headers: {
        'Authorization': "Basic " + window.btoa('wbadmin:wbadmin')
      }
    })
}

completeTask(taskId: string, reqBody: any){
  return this.http.put(`http://localhost:8080/kie-server/services/rest/server/containers/LeaveTrackerdemo1_1.0.0-SNAPSHOT/tasks/${taskId}/states/completed?user=wbadmin`,reqBody, {
    headers: {
      'Authorization': "Basic " + window.btoa('wbadmin:wbadmin')
    }
  })
}
}
