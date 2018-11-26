import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../models/project.interface';
import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-projectcounter',
  templateUrl: 'projectcounter.html',
})
export class ProjectcounterPage {

  public project: Project;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public projectsService: ProjectsProvider, 
    public auth: AuthProvider) 
  {
    this.project = navParams.get("project");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectcounterPage');
  }

      updateCounter() {
        this.projectsService.updateCounter(this.project);
      }
    
      onIncrement() {
        if(this.auth.currentUser == this.project.owner) {

        if(this.project.counterOwner >= 0) {
          this.project.counterOwner++
          this.updateCounter();
        }  
      } else {

        if(this.project.counterShare >= 0) {
          this.project.counterShare++
          this.updateCounter();
        }
        
      }
    }
        
      onDecrement() {
        if(this.auth.currentUser == this.project.owner) {

        if(this.project.counterOwner > 0) {
          this.project.counterOwner--
          this.updateCounter();
        }  

         } else {

          if(this.project.counterShare > 0) {
            this.project.counterShare--
            this.updateCounter();
         }

        }
    }
  }
