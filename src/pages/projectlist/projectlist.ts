import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProjectcreatePage } from '../projectcreate/projectcreate';
import { ProjectopenPage } from '../projectopen/projectopen';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../models/project.interface';
import { SettingsPage } from '../settings/settings';
import { ProjectsharePage } from '../projectshare/projectshare';
import { AuthProvider } from '../../providers/auth/auth';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-projectlist',
  templateUrl: 'projectlist.html',
})
export class ProjectlistPage {

  constructor(public navCtrl: NavController,
    public projectsService: ProjectsProvider, public auth: AuthProvider) {
      this.getAllProjects();  
    }

    getAllProjects() {
      const allProjects = this.projectsService.getAllProjects().valueChanges();
      const shareProjects = this.projectsService.getProjectsByShare().valueChanges();

      this.projectsService.projectList = combineLatest<any[]>(allProjects, shareProjects).pipe(
        map(arr => arr.reduce((acc, cur) => acc.concat(cur) ) ),
      )
    }

    getProjectsByInProgress() {
      this.projectsService.projectList = this.projectsService.getProjectsByInProgress().valueChanges();
    }

    getProjectsByComplete() {
      this.projectsService.projectList = this.projectsService.getProjectsByComplete().valueChanges();
    }

    getProjectsByFavorite() {
      this.projectsService.projectList = this.projectsService.getProjectsByFavorite().valueChanges();
    }

    getProjectsByShare() {
      this.projectsService.projectList = this.projectsService.getProjectsByShare().valueChanges();
    }
    
    setFavoriteTrue(project) {
      project.favorite = true 
      this.projectsService.updateFavorite(project);
    }

    setFavoriteFalse(project) {
      project.favorite = false
      this.projectsService.updateFavorite(project);
    }

    addProject() {
      this.navCtrl.push(ProjectcreatePage);
    }
    
    openProject(project : Project) {
      this.navCtrl.push(ProjectopenPage, {
        project:project
      });
    }

    setProjectShare(project : Project) {
      this.navCtrl.push(ProjectsharePage, {
        project:project
      });
    }

    settings() {
      this.navCtrl.push(SettingsPage);
    }
  }
