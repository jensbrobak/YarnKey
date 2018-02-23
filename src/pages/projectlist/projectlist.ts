import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ProjectcreatePage } from '../projectcreate/projectcreate';
import { ProjecteditPage } from '../projectedit/projectedit';

/**
 * Generated class for the ProjectlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projectlist',
  templateUrl: 'projectlist.html',
})
export class ProjectlistPage {

projects: any = [];
totalIncome = 0;
totalExpense = 0;
balance = 0;

  constructor(public navCtrl: NavController, 
    private sqlite: SQLite) {}

    ionViewDidLoad() {
      this.getProjects();
    }
    
    ionViewWillEnter() {
      this.getProjects();
    }
    
    getProjects() {
      this.sqlite.create({
        name: 'yarnkeydb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
       // CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)
        db.executeSql('CREATE TABLE IF NOT EXISTS projects(rowid INTEGER PRIMARY KEY, name TEXT, description TEXT, status TEXT, yarnProductName TEXT, yarnColorCode TEXT, yarnColor TEXT, yarnLength INT, needleSize TEXT, batchNr TEXT, notes TEXT, counter INT)',{})
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('SELECT * FROM projects WHERE status="Igangværende"', {})
        .then(res => {
          this.projects = [];
          for(var i=0; i<res.rows.length; i++) {
            //this.projects.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
            this.projects.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,description:res.rows.item(i).description,status:res.rows.item(i).status,yarnProductName:res.rows.item(i).yarnProductName,yarnColorCode:res.rows.item(i).yarnColorCode,yarnColor:res.rows.item(i).yarnColor,yarnLength:res.rows.item(i).yarnLength,needleSize:res.rows.item(i).needleSize,batchNr:res.rows.item(i).batchNr,notes:res.rows.item(i).notes,counter:res.rows.item(i).counter})
          }
        })
        .catch(e => console.log(e));
        db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', {})
        .then(res => {
          if(res.rows.length>0) {
            this.totalIncome = parseInt(res.rows.item(0).totalIncome);
            this.balance = this.totalIncome-this.totalExpense;
          }
        })
        .catch(e => console.log(e));
        db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', {})
        .then(res => {
          if(res.rows.length>0) {
            this.totalExpense = parseInt(res.rows.item(0).totalExpense);
            this.balance = this.totalIncome-this.totalExpense;
          }
        })
      }).catch(e => console.log(e));
    }
    
    addProject() {
      this.navCtrl.push(ProjectcreatePage);
    }
    
    editProject(rowid) {
      this.navCtrl.push(ProjecteditPage, {
        rowid:rowid
      });
    }
    
    deleteProject(rowid) {
      this.sqlite.create({
        name: 'yarnkeydb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM projects WHERE rowid=?', [rowid])
        .then(res => {
          console.log(res);
          this.getProjects();
        })
        .catch(e => console.log(e));
      }).catch(e => console.log(e));
    }
  }