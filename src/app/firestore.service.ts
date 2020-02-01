import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentChangeAction,
  Action,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import {
  map,
  tap,
  take,
  switchMap,
  mergeMap,
  expand,
  takeWhile
} from "rxjs/operators";
import { Subject, Course } from "./models";

@Injectable({
  providedIn: "root"
})
export class FirestoreService {
  constructor(private db: AngularFirestore) {}

  getSubjects() {
    return this.db
      .collection("subjects")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(sub => {
            const subject = sub.payload.doc.data() as Subject;
            subject.id = sub.payload.doc.id;
            subject.courses = this.getCourses(subject.id);
            return subject;
          });
        })
      );
  }

  getCourses(subjectId: string) {
    console.log(`/subjects/${subjectId}/courses`);
    return this.db
      .collection(`/subjects/${subjectId}/courses`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes
            .map(cor => {
              const course = cor.payload.doc.data() as Course;
              return course;
            })
            .sort((a, b) => {
              if (a.completionDate === b.completionDate) {
                return 0;
              }
              const aYear = Number.parseInt(
                a.completionDate.substring(a.completionDate.length - 4)
              );
              const bYear = Number.parseInt(
                b.completionDate.substring(b.completionDate.length - 4)
              );

              if (aYear !== bYear) {
                return aYear - bYear;
              }

              if (
                a.completionDate.substring(0, a.completionDate.length - 5) !==
                "Spring"
              ) {
                return 1;
              }
            });
        })
      );
  }
}
