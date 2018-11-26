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

 projectPictureUrl: Observable<any[]>;
 
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

      this.afStore.collection(this.db).doc(project.rowid).update({

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

uploadProjectPicture(filePath, projectPictureUrl) : AngularFireUploadTask {

  return this.storage.ref(filePath).putString(projectPictureUrl, 'data_url');
  
}


getProjectPictureByRowId(project) {
    
  const ref = this.storage.ref(project.picture);

  return ref.getDownloadURL();

}

updateProjectPicture(project) {

  this.afStore.collection(this.db).doc(project.rowid).update({

    picture: project.picture

});

}

deleteProjectPictureByRowId(project) {

  this.storage.ref(project.picture).delete();
}

}

