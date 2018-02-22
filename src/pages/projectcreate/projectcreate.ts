import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ProjectcreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projectcreate',
  templateUrl: 'projectcreate.html',
})
export class ProjectcreatePage {

  project = { name:"", description:"", status:"Igangværende",  yarnProductName:"",  yarnColorCode:"", yarnColor:"",  yarnLength:"",  needleSize:"",  batchNr:"", notes:"", counter:0 };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {}

  saveProject() {
    this.sqlite.create({
      name: 'yarnkeydb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO projects VALUES(NULL,?,?,?,?,?,?,?,?,?,?)',[this.project.name,this.project.description,this.project.status,this.project.yarnProductName,this.project.yarnColorCode,this.project.yarnColor,this.project.yarnLength,this.project.needleSize,this.project.batchNr,this.project.counter])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
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
