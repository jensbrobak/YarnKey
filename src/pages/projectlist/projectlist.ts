import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProjectcreatePage } from '../projectcreate/projectcreate';
import { ProjecteditPage } from '../projectedit/projectedit';
import { ProjectopenPage } from '../projectopen/projectopen';
import { ProjectsProvider } from '../../providers/projects/projects';

@IonicPage()
@Component({
  selector: 'page-projectlist',
  templateUrl: 'projectlist.html',
})
export class ProjectlistPage {

  constructor(public navCtrl: NavController,
    public projectsService: ProjectsProvider) {}


    ionViewDidLoad() {
      this.getAllProjects();
    }
    
    ionViewWillEnter() {
      this.createDbProjects();
      this.getAllProjects();
    }

    getAllProjects() {
      this.projectsService.getAllProjects();
    }

    createDbProjects() {
      this.projectsService.createDbProjects();
    }

    getProjectsByInProgress() {
      this.projectsService.getProjectsByInProgress();
    }

    getProjectsByComplete() {
      this.projectsService.getProjectsByComplete();
    }
    
    addProject() {
      this.navCtrl.push(ProjectcreatePage);
    }
    
    openProject(rowid) {
      this.navCtrl.push(ProjectopenPage, {
        rowid:rowid
      });
    }

    editProject(rowid) {
      this.navCtrl.push(ProjecteditPage, {
        rowid:rowid
      });
    }
  }
