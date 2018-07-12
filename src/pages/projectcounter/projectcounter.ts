import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../models/project.interface';
@IonicPage()
@Component({
  selector: 'page-projectcounter',
  templateUrl: 'projectcounter.html',
})
export class ProjectcounterPage {

  public project: Project;

  constructor(public navCtrl: NavController, public navParams: NavParams, public projectsService: ProjectsProvider) {
    this.project = navParams.get("project");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectcounterPage');
  }

      updateCounter(project) {
        this.projectsService.updateCounter(this.project);
      }
    
      onIncrement() {

        if(this.project.counter >= 0) {
          this.project.counter++
          this.updateCounter(this.project);
        }  
        
        
         }
        
      onDecrement() {
          
        if(this.project.counter > 0) {
          this.project.counter--
          this.updateCounter(this.project);
        }  

        
         }
    }
