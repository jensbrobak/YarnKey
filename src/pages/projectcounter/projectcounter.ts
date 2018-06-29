import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';
@IonicPage()
@Component({
  selector: 'page-projectcounter',
  templateUrl: 'projectcounter.html',
})
export class ProjectcounterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public projectsService: ProjectsProvider) {
    this.projectsService.getCurrentCounter(navParams.get("rowid"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectcounterPage');
  }

      updateCounter() {
        this.projectsService.updateCounter();
      }
    
      onIncrement() {

        if(this.projectsService.project.counter >= 0) {
          this.projectsService.project.counter++
          this.projectsService.updateCounter()
        }  
        
        
         }
        
      onDecrement() {
          
        if(this.projectsService.project.counter > 0) {
          this.projectsService.project.counter--
          this.projectsService.updateCounter()
        }  

        
         }
    }
