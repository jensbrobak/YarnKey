import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ProjecteditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projectedit',
  templateUrl: 'projectedit.html',
})
export class ProjecteditPage {



  project = { rowid:0, name:"", description:"", status:"Igangværende",  yarnProductName:"",  yarnColorCode:"", yarnColor:"",  yarnLength:"",  needleSize:"",  batchNr:"", notes:"", counter:0 };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
      this.getCurrentProject(navParams.get("rowid"));
  }

  getCurrentProject(rowid) {
    this.sqlite.create({
      name: 'yarnkeydb.db',
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
            this.project.counter = res.rows.item(0).counter;
            
          
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

  updateProject() {
    this.sqlite.create({
      name: 'yarnkeydb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE projects SET name=?, description=?, status=?, yarnProductName=?, yarnColorCode=?, yarnColor=?, yarnLength=?, needleSize=?, batchNr=?, notes=?, counter=? WHERE rowid=?',[this.project.name,this.project.description,this.project.status,this.project.yarnProductName,this.project.yarnColorCode,this.project.yarnColor,this.project.yarnLength,this.project.needleSize,this.project.batchNr,this.project.counter,this.project.rowid])
      .then(res => {   
      console.log(res);
          this.toast.show('Projekt opdateret', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
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

}
