import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProjectcreatePage } from '../projectcreate/projectcreate';
import { ProjecteditPage } from '../projectedit/projectedit';
import { ProjectopenPage } from '../projectopen/projectopen';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../models/project.interface';

@IonicPage()
@Component({
  selector: 'page-projectlist',
  templateUrl: 'projectlist.html',
})
export class ProjectlistPage {

  constructor(public navCtrl: NavController,
    public projectsService: ProjectsProvider) {
      this.createDbProjects();
    }

    ionViewDidLoad() {
      this.projectsService.projectList = this.projectsService.getAllProjects().valueChanges();
    }
    
    ionViewWillEnter() {
      this.projectsService.projectList = this.projectsService.getAllProjects().valueChanges();
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
    
    openProject(project : Project) {
      this.navCtrl.push(ProjectopenPage, {
        project:project
      });
    }

    editProject(project : Project) {
      this.navCtrl.push(ProjecteditPage, {
        project:project
      });
    }
  }
