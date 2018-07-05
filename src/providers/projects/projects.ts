import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {

  project = { rowid:"", name:"", description:"", status:"Igangværende",  yarnProductName:"",  yarnColorCode:"", yarnColor:"",  yarnLength:"",  needleSize:"",  batchNr:"", notes:"", counter:0, recipe:"" };

  projectsList: AngularFireList<any>;
  projects: Observable<any[]>;

  constructor(private afDatabase: AngularFireDatabase) {
    }

    createDbProjects() {
      this.projectsList = this.afDatabase.list('/projects');
      this.projects = this.projectsList.valueChanges();
    }

    // createDbProjects() {
    //   this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
    //     db.executeSql('CREATE TABLE IF NOT EXISTS projects(rowid INTEGER PRIMARY KEY, name TEXT, description TEXT, status TEXT, yarnProductName TEXT, yarnColorCode TEXT, yarnColor TEXT, yarnLength TEXT, needleSize TEXT, batchNr TEXT, notes TEXT, counter INT, recipe TEXT)', {})
    //     .then(res => console.log('createDbProjects'))
    //     .catch(e => console.log(e));
    //   }
    //   )}

    getAllProjects() {
      this.projectsList = this.afDatabase.list('/projects');
    }
    
    getProjectsByInProgress() {
    //   this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
    //     db.executeSql('SELECT * FROM projects WHERE status="Igangværende" ORDER BY rowid DESC', {})
    //     .then(res => {
    //       this.projects = [];
    //       for(var i=0; i<res.rows.length; i++) {
    //         this.projects.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,description:res.rows.item(i).description,status:res.rows.item(i).status,yarnProductName:res.rows.item(i).yarnProductName,yarnColorCode:res.rows.item(i).yarnColorCode,yarnColor:res.rows.item(i).yarnColor,yarnLength:res.rows.item(i).yarnLength,needleSize:res.rows.item(i).needleSize,batchNr:res.rows.item(i).batchNr,notes:res.rows.item(i).notes,counter:res.rows.item(i).counter,recipe:res.rows.item(i).recipe})
    //       }
    //     })  .then(res => console.log('getProjectsByInProgress'))
    //     .catch(e => console.log(e));
    // }
    //   )
  }

      getProjectsByComplete() {
      //   this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
      //     db.executeSql('SELECT * FROM projects WHERE status="Færdig" ORDER BY rowid DESC', {})
      //     .then(res => {
      //       this.projects = [];
      //       for(var i=0; i<res.rows.length; i++) {
      //         this.projects.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,description:res.rows.item(i).description,status:res.rows.item(i).status,yarnProductName:res.rows.item(i).yarnProductName,yarnColorCode:res.rows.item(i).yarnColorCode,yarnColor:res.rows.item(i).yarnColor,yarnLength:res.rows.item(i).yarnLength,needleSize:res.rows.item(i).needleSize,batchNr:res.rows.item(i).batchNr,notes:res.rows.item(i).notes,counter:res.rows.item(i).counter,recipe:res.rows.item(i).recipe})
      //       }
      //     })  .then(res => console.log('getProjectsByComplete'))
      //     .catch(e => console.log(e));
      // }
      //   )
    }

        saveProject() {
          //this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
           // db.executeSql('INSERT INTO projects VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?)',[])
         // }).catch(e => console.log(e));

          const newProjectRef = this.projectsList.push({});
 
          newProjectRef.set({
            rowid: newProjectRef.key,
            name: this.project.name,
            description: this.project.description,
            status: this.project.status,
            yarnProductName: this.project.yarnProductName,
            yarnColorCode: this.project.yarnColorCode,
            yarnColor: this.project.yarnColor,
            yarnLength: this.project.yarnLength,
            needleSize: this.project.needleSize,
            batchNr: this.project.batchNr,
            notes: this.project.notes,
            counter: this.project.counter,
            recipe: this.project.recipe
        })
          }
    

        updateProject() {
          // this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
           // db.executeSql('UPDATE projects SET name=?, description=?, status=?, yarnProductName=?, yarnColorCode=?, yarnColor=?, yarnLength=?, needleSize=?, batchNr=?, notes=?, counter=?, recipe=? WHERE rowid=?',[this.project.name,this.project.description,this.project.status,this.project.yarnProductName,this.project.yarnColorCode,this.project.yarnColor,this.project.yarnLength,this.project.needleSize,this.project.batchNr,this.project.notes,this.project.counter,this.project.recipe,this.project.rowid])
         // }).catch(e => console.log(e));
         this.projectsList.update(this.project.rowid, {

          name: this.project.name,
          description: this.project.description,
          status: this.project.status,
          yarnProductName: this.project.yarnProductName,
          yarnColorCode: this.project.yarnColorCode,
          yarnColor: this.project.yarnColor,
          yarnLength: this.project.yarnLength,
          needleSize: this.project.needleSize,
          batchNr: this.project.batchNr,
          notes: this.project.notes,
          counter: this.project.counter,
          recipe: this.project.recipe 
        
        });
        }

  getCurrentProject(rowid) {
    
    //   this.projectsList.query.equalTo(rowid).on(t
    //     .then(res => {
    //       if(res.rows.length > 0) {
    //         this.project.rowid = res.rows.item(0).rowid;
    //         this.project.name = res.rows.item(0).name;
    //         this.project.description = res.rows.item(0).description;
    //         this.project.status = res.rows.item(0).status;
    //         this.project.yarnProductName = res.rows.item(0).yarnProductName;
    //         this.project.yarnColorCode = res.rows.item(0).yarnColorCode;
    //         this.project.yarnColor = res.rows.item(0).yarnColor;
    //         this.project.yarnLength = res.rows.item(0).yarnLength;
    //         this.project.needleSize = res.rows.item(0).needleSize;
    //         this.project.batchNr = res.rows.item(0).batchNr;
    //         this.project.notes = res.rows.item(0).notes;
    //         this.project.counter = res.rows.item(0).counter;
    //         this.project.recipe = res.rows.item(0).recipe;
    //       }
    //     }).catch(e => console.log(e));
    // });
  }

  deleteProject(rowid) {
    this.projectsList.remove(rowid);
  }

  getCurrentCounter(rowid) {
    // this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
    //   db.executeSql('SELECT * FROM projects WHERE rowid=?', [rowid])
    //     .then(res => {
    //       if(res.rows.length > 0) {
    //         this.project.rowid = res.rows.item(0).rowid;
    //         this.project.counter = res.rows.item(0).counter;
    //       }
    //     }).catch(e => console.log(e));
    //   })
  }

  updateCounter() {
    this.projectsList.update(this.project.rowid, {

      counter: this.project.counter
   
    });
  }

      clearProjectFields() {
        this.project.rowid = "";
        this.project.name = "";
        this.project.description = "";
        this.project.status = "Igangværende";
        this.project.yarnProductName = "";
        this.project.yarnColorCode = "";
        this.project.yarnColor = "";
        this.project.yarnLength = "";
        this.project.needleSize = "";
        this.project.batchNr = "";
        this.project.notes = "";
        this.project.counter = 0;
        this.project.recipe = "";
      }
}

