import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {

  project = { rowid:0, name:"", description:"", status:"Igangværende",  yarnProductName:"",  yarnColorCode:"", yarnColor:"",  yarnLength:"",  needleSize:"",  batchNr:"", notes:"", counter:0, recipe:"" };
  
  projects: any = [];

  constructor(private sqlite: SQLite) {
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

        saveProject() {
          this.sqlite.create({
            name: 'yarnkey.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('INSERT INTO projects VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?)',[this.project.name,this.project.description,this.project.status,this.project.yarnProductName,this.project.yarnColorCode,this.project.yarnColor,this.project.yarnLength,this.project.needleSize,this.project.batchNr,this.project.notes,this.project.counter,this.project.recipe])
          });
        }

        updateProject() {
          this.sqlite.create({
            name: 'yarnkey.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('UPDATE projects SET name=?, description=?, status=?, yarnProductName=?, yarnColorCode=?, yarnColor=?, yarnLength=?, needleSize=?, batchNr=?, notes=?, counter=?, recipe=? WHERE rowid=?',[this.project.name,this.project.description,this.project.status,this.project.yarnProductName,this.project.yarnColorCode,this.project.yarnColor,this.project.yarnLength,this.project.needleSize,this.project.batchNr,this.project.notes,this.project.counter,this.project.recipe,this.project.rowid])
          });
        }

  getCurrentProject(rowid) {
    this.sqlite.create({
      name: 'yarnkey.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM projects WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.project.rowid = res.rows.item(0).rowid;
            this.project.name = res.rows.item(0).name;
            this.project.description = res.rows.item(0).description;
            this.project.status = res.rows.item(0).status;
            this.project.yarnProductName = res.rows.item(0).yarnProductName;
            this.project.yarnColorCode = res.rows.item(0).yarnColorCode;
            this.project.yarnColor = res.rows.item(0).yarnColor;
            this.project.yarnLength = res.rows.item(0).yarnLength;
            this.project.needleSize = res.rows.item(0).needleSize;
            this.project.batchNr = res.rows.item(0).batchNr;
            this.project.notes = res.rows.item(0).notes;
            this.project.counter = res.rows.item(0).counter;
            this.project.recipe = res.rows.item(0).recipe;
          }
        });
    });
  }

  deleteProject(rowid) {
    this.sqlite.create({
      name: 'yarnkey.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM projects WHERE rowid=?', [rowid])
    }).catch(e => console.log(e));
  }

  getCurrentCounter(rowid) {
    this.sqlite.create({
      name: 'yarnkey.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM projects WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.project.rowid = res.rows.item(0).rowid;
            this.project.counter = res.rows.item(0).counter;
          }
        })
      }
    )}

  updateCounter() {
    this.sqlite.create({
      name: 'yarnkey.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE projects SET counter=? WHERE rowid=?',[this.project.counter,this.project.rowid])
      .then(res => {   
      console.log(res);
            }
          );
        }
      )}
}

