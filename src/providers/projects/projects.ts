import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
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

        saveProject(project) {

          const rowid = this.afStore.createId();

          this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(rowid).set({

            rowid: rowid,
            name: project.name,
            description: project.description,
            status: "Igangværende",
            yarnProductName: project.yarnProductName,
            yarnColorCode: project.yarnColorCode,
            yarnColor: project.yarnColor,
            yarnLength: project.yarnLength,
            needleSize: project.needleSize,
            batchNr: project.batchNr,
            notes: project.notes,
            counter: project.counter,
            recipe: project.recipe,
            picture: project.picture
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
            recipe: project.recipe
      });
        
        }

  deleteProject(project) {
    this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).delete();
    this.deleteProjectPictureByRowId(project);
  }

  updateCounter(project) {

    this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).update({

    counter: project.counter

   });
}

uploadProjectPicture(filePath, projectPictureUrl) : AngularFireUploadTask {
  return this.storage.ref(filePath).putString(projectPictureUrl, 'data_url');
}


getProjectPictureByRowId(project) {
    
  const ref = this.storage.ref(project.picture);
  return fromPromise(ref.getDownloadURL());

}

updateProjectPicture(project) {

  this.afStore.collection(`projectList`).doc(this.auth.currentUser).collection(this.auth.currentUser).doc(project.rowid).update({

    picture: project.picture

});

}

deleteProjectPictureByRowId(project) {
  this.storage.ref(project.picture).delete();
}

}

