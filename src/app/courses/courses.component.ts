import { Component, OnInit } from "@angular/core";

import { Course, Subject } from "../models";
import { AngularFirestore } from "@angular/fire/firestore";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"]
})
export class CoursesComponent implements OnInit {
  subjects: [Subject];

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.subjects = [
      {
        name: "Computer Science",
        courses: [
          {
            course: "CS 2114",
            description: [
              "Design, create, and debug programs using data structures such as singly linked list, doublely linked lists, stacks, and queues",
              "Test"
            ],
            name: "Software Design & Data Structures",
            subject: "CS",
            programmingLanguage: "Java",
            inProgress: false,
            grade: "A",
            completionDate: "Fall 2019"
          }
        ]
      }
    ];

    console.log(
      this.db
        .collection("subjects")
        .valueChanges()
        .subscribe(val => console.log(va))
    );
  }
}
