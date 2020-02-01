import { Component, OnInit } from "@angular/core";

import { Course, Subject } from "../models";
import { FirestoreService } from "../firestore.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"]
})
export class CoursesComponent implements OnInit {
  subjects: Observable<Subject[]>;

  constructor(private fsService: FirestoreService) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.subjects = this.fsService.getSubjects();
  }
}
