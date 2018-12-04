import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../models/project.interface';
import { AuthProvider } from '../../providers/auth/auth';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {

 project : Project; 

 db : string;
 
 projectList: Observable<any[]>;

  constructor(private afStore: AngularFirestore, public storage: AngularFireStorage, private auth: AuthProvider) {

      this.db = 'projects';

    }

    getAllProjects() {
      
    return this.afStore.collection(this.db, ref => ref.where('owner', '==', this.auth.currentUser));

    }
    
    getProjectsByInProgress() {

    return this.afStore.collection(this.db, ref => ref.where('owner', '==', this.auth.currentUser)
    
    .where('status', '==', 'Igangværende'));
    
    }

    getProjectsByComplete() {

    return this.afStore.collection(this.db, ref => ref.where('owner', '==', this.auth.currentUser)
    
    .where('status', '==', 'Færdig'));

    }

    getProjectsByFavorite() {

    return this.afStore.collection(this.db, ref => ref.where('owner', '==', this.auth.currentUser)
    
    .where('favorite', '==', true));
  
    }

    getProjectsByShare() {

    return this.afStore.collection(this.db, ref => ref.where('share', '==', this.auth.currentUser));
    
    }

    saveProject(project) {

      const rowid = this.afStore.createId();

      this.afStore.collection(this.db).doc(rowid).set({

        rowid: rowid,
        name: project.name,
        description: project.description,
        status: "Igangværende",
        favorite: false,
        yarnProductName: project.yarnProductName,
        yarnColorCode: project.yarnColorCode,
        yarnColor: project.yarnColor,
        yarnLength: project.yarnLength,
        needleSize: project.needleSize,
        batchNr: project.batchNr,
        notes: project.notes,
        counterOwner: 0,
        counterShare: 0,
        recipe: project.recipe,
        picture: "",
        owner: this.auth.currentUser,
        share: null,
        shareStatus: false
  });
    }

    updateProject(project) {

    var projectDocRef = this.afStore.collection(this.db).doc(project.rowid);

    return this.afStore.firestore.runTransaction(function(transaction) {

        // Hvis der opstår eventuelle samtidighedsproblematikker afvikles koden x-antal gange
        return transaction.get(projectDocRef.ref).then(function(projectDoc) {
            if (!projectDoc.exists) {
                throw "Projekt dokumentet eksistere ikke!";
            }

            transaction.update(projectDocRef.ref, {         
              
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
              recipe: project.recipe, 
            
            });
        });
    }).then(function() {
        console.log("Transaktionen er successfuldt blevet gennemført!");
    }).catch(function(error) {
        console.log("Transaktion er ikke blevet gennemført grundet: ", error);
    });
    
    }

  deleteProject(project) {

    if(project.owner == this.auth.currentUser) {

    this.afStore.collection(this.db).doc(project.rowid).delete();

    if(project.picture) {

    this.deleteProjectPictureByRowId(project);

    }
  }
  }
  
   updateCounter(project) {

    if(project.owner == this.auth.currentUser) {
    
    this.afStore.collection(this.db).doc(project.rowid).update({
    
    counterOwner: project.counterOwner

   });

  } else {

    this.afStore.collection(this.db).doc(project.rowid).update({
    
    counterShare: project.counterShare

   });

  }
  }

  updateFavorite(project) {

    this.afStore.collection(this.db).doc(project.rowid).update({

      favorite: project.favorite
  
     });

  }

  updateShare(project) {

    this.afStore.collection(this.db).doc(project.rowid).update({

      share: project.share,
      shareStatus: project.shareStatus,
  
     });

  }

  uploadProjectPicture(project, filePath, projectPictureUrl) : AngularFireUploadTask {

  const task = this.storage.ref(filePath).putString(projectPictureUrl, 'data_url');

  //Efter billedet er blevet uploadet til Firebase Storage
  task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      
    //Hentes den komplette URL til billedet
    uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {

        //URL'en til billedet bliver således gemt i Firestore
        project.picture = downloadURL;
        this.updateProjectPicture(project)
    }
  )})

    return task;
  }

  updateProjectPicture(project) {

    this.afStore.collection(this.db).doc(project.rowid).update({

      picture: project.picture

  });

  }

  copyProject(project) {

    const rowid = this.afStore.createId();

    this.afStore.collection(this.db).doc(rowid).set({

      rowid: rowid,
      name: "Kopi af:" + project.name,
      description: project.description,
      status: project.status,
      favorite: project.favorite,
      yarnProductName: project.yarnProductName,
      yarnColorCode: project.yarnColorCode,
      yarnColor: project.yarnColor,
      yarnLength: project.yarnLength,
      needleSize: project.needleSize,
      batchNr: project.batchNr,
      notes: project.notes,
      counterOwner: project.counterShare,
      counterShare: 0,
      recipe: project.recipe,
      picture: "",
      owner: this.auth.currentUser,
      share: null,
      shareStatus: false
  });
  }

  deleteProjectPictureByRowId(project) {

    if(project.owner == this.auth.currentUser) {

    // Sletter projekt billedet ud fra den komplette URL
    this.storage.storage.refFromURL(project.picture).delete();
    }

  }

  deleteAllProjectsFromUser() {
    
return Observable.create(observer => { 
  this.afStore.collection(this.db, ref => ref.where('owner', '==', this.auth.currentUser)).ref.get().then((querySnapshot) => { 
   querySnapshot.forEach((project) => {
    observer.next(querySnapshot);
  if(project.exists) {

      this.project = project.data() as Project;

      this.deleteProject(this.project);

      console.log(''+ this.auth.currentUser +'s project '+ this.project.rowid +' has been deleted');

  } else {

      
  }

   })
}).catch(error => {
    
  console.log(''+ this.auth.currentUser + ' has no projects to be deleted');

});})

}
}

