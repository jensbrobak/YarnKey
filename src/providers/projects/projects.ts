import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../models/project.interface';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {

 // project = { rowid:"", name:"", description:"", status:"Igangværende",  yarnProductName:"",  yarnColorCode:"", yarnColor:"",  yarnLength:"",  needleSize:"",  batchNr:"", notes:"", counter:0, recipe:"" };

 project : Project; 
 
 projectList: Observable<any[]>;

  constructor(private afStore: AngularFirestore) {
    }

    createDbProjects() {
      return this.afStore.collection(`projectList`);
    }

    // createDbProjects() {
    //   this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
    //     db.executeSql('CREATE TABLE IF NOT EXISTS projects(rowid INTEGER PRIMARY KEY, name TEXT, description TEXT, status TEXT, yarnProductName TEXT, yarnColorCode TEXT, yarnColor TEXT, yarnLength TEXT, needleSize TEXT, batchNr TEXT, notes TEXT, counter INT, recipe TEXT)', {})
    //     .then(res => console.log('createDbProjects'))
    //     .catch(e => console.log(e));
    //   }
    //   )}

    getAllProjects() {
      return this.afStore.collection(`projectList`);
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

        saveProject(project) {
          //this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
           // db.executeSql('INSERT INTO projects VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?)',[])
         // }).catch(e => console.log(e));

          const rowid = this.afStore.createId();
 
          this.afStore.doc(`projectList/${rowid}`).set({

            rowid: rowid,
            name: project.name,
            description: project.description,
            status: "Igangværende",
            yarnProductName: project.yarnProductName,
            yarnColorCode: project.yarnColorCode,
            yarnColor: project.yarnColor,
            yarnLength: project.yarnLength,
            needleSize: project.needleSize,
            batchNr: project.batchNr,
            notes: project.notes,
            counter: project.counter,
            recipe: project.recipe
      });
        }
          
    

        updateProject(project) {
          // this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
           // db.executeSql('UPDATE projects SET name=?, description=?, status=?, yarnProductName=?, yarnColorCode=?, yarnColor=?, yarnLength=?, needleSize=?, batchNr=?, notes=?, counter=?, recipe=? WHERE rowid=?',[this.project.name,this.project.description,this.project.status,this.project.yarnProductName,this.project.yarnColorCode,this.project.yarnColor,this.project.yarnLength,this.project.needleSize,this.project.batchNr,this.project.notes,this.project.counter,this.project.recipe,this.project.rowid])
         // }).catch(e => console.log(e));
       //this.projectList.update(this.project.rowid, {

          this.afStore.doc(`projectList/${project.rowid}`).update({

            //rowid: this.project.rowid,
            name: project.name,
            description: project.description,
            status: project.status,
            yarnProductName: project.yarnProductName,
            yarnColorCode: project.yarnColorCode,
            yarnColor: project.yarnColor,
            yarnLength: project.yarnLength,
            needleSize: project.needleSize,
            batchNr: project.batchNr,
            notes: project.notes,
            counter: project.counter,
            recipe: project.recipe
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



    //  const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
  
  //personRef.on('value', personSnapshot => {
 //   myPerson = personSnapshot.val();


    //const projectRes: this.afStore.collection

            var name = this.afStore.collection(`projectList`).doc(rowid).collection('name');
            
            this.project.description = this.afStore.collection(`projectList`).doc(rowid).collection('description').toString();


            //                   doc.rowid = this.project.rowid;
            // doc.name = this.project.name;
            // doc.description = this.project.description;
            // doc.status = this.project.status;
            // doc.yarnProductName = this.project.yarnProductName;
            // doc.yarnColorCode = this.project.yarnColorCode;
            // doc.yarnColor = this.project.yarnColor;
            // doc.yarnLength = this.project.yarnLength;
            // doc.needleSize = this.project.needleSize;
            // doc.batchNr = this.project.batchNr;
            // doc.notes = this.project.notes;
            // doc.counter = this.project.counter;
            // doc.recipe = this.project.recipe;
   

  }

    

  deleteProject(rowid) {
   // this.projectList.remove(rowid);
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
   // this.projectsList.update(this.project.rowid, {

      //counter: this.project.counter
   
   // });
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

