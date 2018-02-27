import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-projectcounter',
  templateUrl: 'projectcounter.html',
})
export class ProjectcounterPage {

 
  project = { rowid:0, counter:0 };

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.getCurrentCounter(navParams.get("rowid"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectcounterPage');
  }
  

  getCurrentCounter(rowid) {
    this.sqlite.create({
      name: 'yarnkeydb.db',
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
      name: 'yarnkeydb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE projects SET counter=? WHERE rowid=?',[this.project.counter,this.project.rowid])
      .then(res => {   
      console.log(res);
            }
          );
        }
      )}
    
      onIncrement() {

        this.project.counter++
        this.updateCounter()
        
         }
        
      onDecrement() {
          
        this.project.counter--
        this.updateCounter()

         }
    }
