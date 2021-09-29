import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseItem } from './CourseItem';

// public courseItem : CourseItem;

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  courseItem : CourseItem;

  constructor (private route: ActivatedRoute) {
    this.courseItem = {
      code: "AA101",
      name: "Fetch name",
      posts: [
        { title: "Title1", desc: "Desc1", files: [new File(["Blobpart1_1"], "file1_1.txt"), new File(["Blobpart1_2"], "file1_2.txt")] },
        { title: "Title2", desc: "Desc2", files: [new File(["Blobpart2_1"], "file2_1.txt"), new File(["Blobpart2_2"], "file2_2.txt")] }
      ]
    };
  }

  ngOnInit(): void {
    // console.log (JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('code') || '{}')));
    this.courseItem.code = JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('code') || '{}'));
  }

}
