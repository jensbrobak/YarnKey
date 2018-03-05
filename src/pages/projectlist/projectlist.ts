import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ProjectcreatePage } from '../projectcreate/projectcreate';
import { ProjecteditPage } from '../projectedit/projectedit';
import { ProjectopenPage } from '../projectopen/projectopen';

@IonicPage()
@Component({
  selector: 'page-projectlist',
  templateUrl: 'projectlist.html',
})
export class ProjectlistPage {

projects: any = [];

  constructor(public navCtrl: NavController,
    private sqlite: SQLite) {}

    ionViewDidLoad() {
      this.getAllProjects();
    }
    
    ionViewWillEnter() {
      this.createDbProjects();
      this.getAllProjects();
    }

    createDbProjects() {
      this.sqlite.create({
        name: 'yarnkey.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS projects(rowid INTEGER PRIMARY KEY, name TEXT, description TEXT, status TEXT, yarnProductName TEXT, yarnColorCode TEXT, yarnColor TEXT, yarnLength TEXT, needleSize TEXT, batchNr TEXT, notes TEXT, counter INT, recipe TEXT)', {})
        .then(res => console.log('createDbProjects'))
        .catch(e => console.log(e));
      }
      )}

    getAllProjects() {
      this.sqlite.create({
        name: 'yarnkey.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM projects ORDER BY rowid DESC', {})
        .then(res => {
          this.projects = [];
          for(var i=0; i<res.rows.length; i++) {
            this.projects.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,description:res.rows.item(i).description,status:res.rows.item(i).status,yarnProductName:res.rows.item(i).yarnProductName,yarnColorCode:res.rows.item(i).yarnColorCode,yarnColor:res.rows.item(i).yarnColor,yarnLength:res.rows.item(i).yarnLength,needleSize:res.rows.item(i).needleSize,batchNr:res.rows.item(i).batchNr,notes:res.rows.item(i).notes,counter:res.rows.item(i).counter,recipe:res.rows.item(i).recipe})
          }
        })  .then(res => console.log('getAllProjects'))
        .catch(e => console.log(e));
    }
      )}
    
    getProjectsByInProgress() {
      this.sqlite.create({
        name: 'yarnkey.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM projects WHERE status="Igangværende" ORDER BY rowid DESC', {})
        .then(res => {
          this.projects = [];
          for(var i=0; i<res.rows.length; i++) {
            this.projects.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,description:res.rows.item(i).description,status:res.rows.item(i).status,yarnProductName:res.rows.item(i).yarnProductName,yarnColorCode:res.rows.item(i).yarnColorCode,yarnColor:res.rows.item(i).yarnColor,yarnLength:res.rows.item(i).yarnLength,needleSize:res.rows.item(i).needleSize,batchNr:res.rows.item(i).batchNr,notes:res.rows.item(i).notes,counter:res.rows.item(i).counter,recipe:res.rows.item(i).recipe})
          }
        })  .then(res => console.log('getProjectsByInProgress'))
        .catch(e => console.log(e));
    }
      )}

      getProjectsByComplete() {
        this.sqlite.create({
          name: 'yarnkey.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('SELECT * FROM projects WHERE status="Færdig" ORDER BY rowid DESC', {})
          .then(res => {
            this.projects = [];
            for(var i=0; i<res.rows.length; i++) {
              this.projects.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,description:res.rows.item(i).description,status:res.rows.item(i).status,yarnProductName:res.rows.item(i).yarnProductName,yarnColorCode:res.rows.item(i).yarnColorCode,yarnColor:res.rows.item(i).yarnColor,yarnLength:res.rows.item(i).yarnLength,needleSize:res.rows.item(i).needleSize,batchNr:res.rows.item(i).batchNr,notes:res.rows.item(i).notes,counter:res.rows.item(i).counter,recipe:res.rows.item(i).recipe})
            }
          })  .then(res => console.log('getProjectsByComplete'))
          .catch(e => console.log(e));
      }
        )}
    
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
    
    deleteProject(rowid) {
      this.sqlite.create({
        name: 'yarnkey.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM projects WHERE rowid=?', [rowid])
        .then(res => {
          console.log(res);
          console.log('deleteProject');
          this.getAllProjects();
        })
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
    }
  }
