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

 projectPictureUrl: Observable<any[]>;
 
 projectList: Observable<any[]>;

 projectListShare: Observable<any[]>;

  constructor(private afStore: AngularFirestore, public storage: AngularFireStorage, private auth: AuthProvider) {
    }

    getAllProjects() {
      
    return this.afStore.collection('projectList').doc(this.auth.currentUser).collection(this.auth.currentUser);
    }
    
    getProjectsByInProgress() {

    return this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser, ref =>
    ref.where('status', '==', 'Igangværende'));
    
    }

    getProjectsByComplete() {

    return this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser, ref =>
    ref.where('status', '==', 'Færdig'));

    }

    getProjectsByFavorite() {

    return this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser, ref =>
    ref.where('favorite', '==', true));
  
    }

    getProjectsByShare(project) {

    return this.afStore.collection(`projectList`).doc(project.share).collection(project.share, ref =>
    ref.where('share', '==', project.share));
    }

        saveProject(project) {

          const rowid = this.afStore.createId();

          this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(rowid).set({

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
            counter: project.counter,
            recipe: project.recipe,
            picture: project.picture,
            owner: this.auth.currentUser,
            share: null
      });
        }

        updateProject(project) {

          this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).update({

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
            recipe: project.recipe,
      });
        
        }

  deleteProject(project) {
    this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).delete();
    if(project.picture) {
    this.deleteProjectPictureByRowId(project);
    }
  }

  updateCounter(project) {

    this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).update({

    counter: project.counter

   });
}

  updateFavorite(project) {

    this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).update({

      favorite: project.favorite
  
     });

  }

  updateShare(project) {

    this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).update({

      share: project.share
  
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

  this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).update({

    picture: project.picture

});

}

deleteProjectPictureByRowId(project) {
  if(project.owner == this.auth.currentUser) {
  this.storage.ref(project.picture).delete();
  }
}

}

