import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-projectcounter',
  templateUrl: 'projectcounter.html',
})
export class ProjectcounterPage {

 
  project = { rowid:0, counter:0 };

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private admobFree : AdMobFree) {
    this.getCurrentCounter(navParams.get("rowid"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectcounterPage');
  }

  ionViewWillLeave() {
    this.showAdmobInterstitialAds();
  }
  
  showAdmobInterstitialAds(){
    const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-5529737002644560/9555898735', 
        isTesting: false,
        autoShow: true,

      };
      this.admobFree.interstitial.config(bannerConfig);

      this.admobFree.interstitial.prepare()
      .then(() => {
          this.admobFree.interstitial.show()
      })
      .catch(e => console.log(e));    
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
    
      onIncrement() {

        if(this.project.counter >= 0) {
          this.project.counter++
          this.updateCounter()
        }  
        
        
         }
        
      onDecrement() {
          
        if(this.project.counter > 0) {
          this.project.counter--
          this.updateCounter()
        }  

        
         }
    }
