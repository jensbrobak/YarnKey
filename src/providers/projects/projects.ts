import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
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
 
 projectList: Observable<any[]>;

  constructor(private afStore: AngularFirestore) {
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
            recipe: project.recipe
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

}

