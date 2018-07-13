import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../models/project.interface';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {

 project : Project; 

 getDownloadURL: Observable<any[]>;  
 
 projectList: Observable<any[]>;

  constructor(private afStore: AngularFirestore, public storage: AngularFireStorage) {
    }

    getAllProjects() {
      return this.afStore.collection(`projectList`);
    }
    
    getProjectsByInProgress() {

    return this.afStore.collection(`projectList`, ref =>
    ref.where('status', '==', 'Igangværende'));
  }

    getProjectsByComplete() {

    return this.afStore.collection(`projectList`, ref =>
    ref.where('status', '==', 'Færdig'));
    }

    getProjectPictureByRowId(project) {

      var starsRef = this.storage.ref(project.picture).child('project.picture');
    
      starsRef.getDownloadURL().then(function(url) {
        var test = url;

        return document.querySelector('img').src = test;
      }).catch(function(error) {
      
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object_not_found':
            // File doesn't exist
            break;
      
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
      
          case 'storage/canceled':
            // User canceled the upload
            break;
      
          
      
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
    }

        saveProject(project) {

          const rowid = this.afStore.createId();
 
          this.afStore.doc(`projectList/${rowid}`).set({

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

          this.afStore.doc(`projectList/${project.rowid}`).update({

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
   this.afStore.doc(`projectList/${project.rowid}`).delete();
  }

  updateCounter(project) {

   this.afStore.doc(`projectList/${project.rowid}`).update({

    counter: project.counter

   });
}

updateProjectPicture(project) {
  //let storageRef = this.afStore.storage().ref();
  // Create a timestamp as filename

  this.afStore.doc(`projectList/${project.rowid}`).update({

    picture: project.picture

  // Create a reference to 'images/todays-date.jpg'
 // const imageRef = storageRef.child(`images/${filename}.jpg`);
});

}

}

