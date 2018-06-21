import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { NavController } from 'ionic-angular/umd';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {

  project = { rowid:0, name:"", description:"", status:"Igangværende",  yarnProductName:"",  yarnColorCode:"", yarnColor:"",  yarnLength:"",  needleSize:"",  batchNr:"", notes:"", counter:0, recipe:"" };

  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    private toast: Toast) {
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
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
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
        this.navCtrl.popToRoot();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}

