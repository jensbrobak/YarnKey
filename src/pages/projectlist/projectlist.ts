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
    }

    ionViewDidLoad() {
      this.projectsService.projectList = this.projectsService.getAllProjects().valueChanges();
    }
    
    ionViewWillEnter() {
      this.projectsService.projectList = this.projectsService.getAllProjects().valueChanges();
    }

    getAllProjects() {
      this.projectsService.projectList = this.projectsService.getAllProjects().valueChanges();
    }

    getProjectsByInProgress() {
      this.projectsService.projectList = this.projectsService.getProjectsByInProgress().valueChanges();
    }

    getProjectsByComplete() {
      this.projectsService.projectList = this.projectsService.getProjectsByComplete().valueChanges();
    }

    getProjectPictureByRowId(project : Project) {
      this.projectsService.getProjectPictureByRowId(project);
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
