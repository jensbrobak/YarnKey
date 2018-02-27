import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-projectcreate',
  templateUrl: 'projectcreate.html',
})
export class ProjectcreatePage {

  project = { name:"", description:"", status:"Igangværende",  yarnProductName:"",  yarnColor:"", yarnColorCode:"",  yarnLength:"", batchNr:"", recipe:"", needleSize:"", notes:"", counter:0 };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {}

  saveProject() {
    this.sqlite.create({
      name: 'yarnkeydb1.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO projects VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?)',[this.project.name,this.project.description,this.project.status,this.project.yarnProductName,this.project.yarnColor, this.project.yarnColorCode,this.project.yarnLength,this.project.batchNr, this.project.recipe, this.project.needleSize, this.project.notes,this.project.counter])
        .then(res => {
          console.log(res);
          this.toast.show('Projekt gemt', '5000', 'center').subscribe(
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
