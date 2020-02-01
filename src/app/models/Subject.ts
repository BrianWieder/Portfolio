import Course from "./Course";
import { Observable } from "rxjs";

export default class Subject {
  name: string;
  courses: Observable<Course[]>;
  id: string;
}
